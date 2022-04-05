import dbconnect from "../../../../lib/mongodb";
import { verifyAuth } from "../../../../lib/auth";
import Comment from "/models/commentModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const comment = await Comment.find({
        _id: req.query.id,
        likes: req.user._id,
      });
      if (comment.length > 0)
        return res.status(400).json({ msg: "You liked this post." });

      await Comment.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Liked Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
