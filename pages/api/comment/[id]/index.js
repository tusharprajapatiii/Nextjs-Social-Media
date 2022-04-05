import { verifyAuth } from "../../../../lib/auth";
import dbconnect from "../../../../lib/mongodb";
import Comment from "/models/commentModel";
import Post from "/models/postsModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const { content } = req.body;

      const updatedMsg = await Comment.findOneAndUpdate(
        {
          _id: req.query.id,
          user: req.user._id,
        },
        { content }
      );

      res.status(200).json({ msg: "Update Success!", updatedMsg });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.query.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Post.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.query.id },
        }
      );

      res.status(200).json({ msg: "Deleted Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
