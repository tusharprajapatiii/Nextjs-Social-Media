import User from "/models/userModel";
import { verifyAuth } from "../../../../lib/auth";
import dbconnect from "../../../../lib/mongodb";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const user = await User.find({ _id: req.query.id, stars: req.user._id });
      if (user.length > 0) {
        return res.status(400).json({ msg: "You starred this user." });
      }

      const star = await User.findOneAndUpdate(
        {
          _id: req.query.id,
        },
        {
          $push: { stars: req.user._id },
        },
        {
          new: true,
        }
      );
      if (!star) {
        return res.status(400).json({ msg: "This user does not exist." });
      }

      const length = star.stars.length;
      res.status(200).json({ message: "Starred User!", length });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
