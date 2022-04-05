import { verifyAuth } from "../../../../lib/auth";
import dbconnect from "../../../../lib/mongodb";
import Post from "/models/postsModel";
import Comment from "/models/commentModel";
import cloudinary from "cloudinary";
export default async function (req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const { content } = req.body;

      const post = await Post.findOneAndUpdate(
        { _id: req.query.id },
        {
          content,
        }
      )
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            model: "User",

            path: "user likes",
            select: "-password",
          },
        });

      res.status(200).json({
        message: "Updated Post!",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const post = await Post.findById({
        _id: req.query.id,
      });
      if (!post)
        return res.status(400).json({ message: "This post does not exist." });
      await Post.findOneAndDelete({
        _id: req.query.id,
      });

      if (post.images.length > 0) {
        for (let i = 0; i < post.images.length; i++) {
          await cloudinary.v2.uploader.destroy(post.images[i].public_id);
        }
      }
      await Comment.deleteMany({ _id: { $in: post.comments } });

      res.status(200).json({
        message: "Deleted Post!",
        post,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
