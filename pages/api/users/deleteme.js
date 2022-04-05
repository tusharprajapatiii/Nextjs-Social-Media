import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import User from "/models/userModel";
import Post from "/models/postsModel";
import Comment from "/models/commentModel";
import cookie from "cookie";
import cloudinary from "cloudinary";
export default async function handler(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "DELETE") {
    //P
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const posts = await Post.find({ user: req.user.id });
      for (let i = 0; i < posts.length; i++) {
        const post = await Post.findById(posts[i]._id);
        for (let j = 0; j < post.images.length; j++) {
          await cloudinary.v2.uploader.destroy(post.images[j].public_id);
        }
      }
      await cloudinary.v2.api.delete_folder(`Posts/${req.user.id}`);

      await Post.deleteMany({ user: req.user._id });
      await Comment.deleteMany({ user: req.user._id });
      await User.findOneAndUpdate(
        {
          following: { $in: [req.user._id] },
        },
        {
          $pull: { following: req.user._id },
        }
      );
      await User.findOneAndUpdate(
        {
          followers: { $in: [req.user._id] },
        },
        {
          $pull: { followers: req.user._id },
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
      );
      await User.findByIdAndDelete(req.user._id);
      res.status(200).json({ message: "User deleted", user });
    } catch (error) {
      res.status(500).json({ message: error, stack: error.stack });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
