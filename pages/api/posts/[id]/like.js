import { verifyAuth } from "../../../../lib/auth";
import dbconnect from "../../../../lib/mongodb";
import Post from "/models/postsModel";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const post = await Post.find({ _id: req.query.id, likes: req.user._id });
      if (post.length > 0)
        return res.status(400).json({ msg: "You liked this post." });

      const like = await Post.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      ).populate("comments", "content");

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.status(200).json({ message: "Liked Post!", ...like._doc });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
