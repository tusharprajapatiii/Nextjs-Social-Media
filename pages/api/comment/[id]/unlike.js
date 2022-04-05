import dbconnect from "../../../../lib/mongodb";
import { verifyAuth } from "../../../../lib/auth";
import Comment from "/models/commentModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.query.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: "UnLiked Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
