import cloudinary from "cloudinary";
import dbconnect from "../../../lib/mongodb";
import { verifyAuth } from "../../../lib/auth";
import Post from "../../../models/postsModel";
import Comment from "../../../models/commentModel";
import APIfeatures from "../../../lib/features";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "POST") {
    try {
      const { content, images } = req.body;
      if (images.length > 4) {
        return res.status(400).json({
          message: "You can only upload up to 4 images",
        });
      }
      let image = [];
      if (typeof images === "string") {
        image.push(images);
      } else {
        image = images;
      }

      const images_url = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: `Posts/${req.user._id}`,
          transformation: [
            {
              height: 380,
              width: 350,
              crop: "fill",
              gravity: "face",
            },
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        });
        images_url.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      const post = new Post({
        content,
        images: images_url,
        user: req.user._id,
      });
      await post.save();
      res
        .status(201)
        .json({ message: "Post created successfully", ...post._doc });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else if (req.method === "GET") {
    try {
      const features = new APIfeatures(
        Post.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query
      )
        .paginate()
        .sort();
      const posts = await features.query
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            model: "User",
            select: "-password",
          },
        });

      // .populate({
      //   path: "comments",
      //   populate: {
      //     path: "user likes",
      //     select: "-password",
      //   },
      // );

      res.status(200).json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    res.setHeader("Allow", [" POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "24mb", // Set desired value here
    },
  },
};
