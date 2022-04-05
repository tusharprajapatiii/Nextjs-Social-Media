import { verifyAuth } from "../../../../lib/auth";
import User from "../../../../models/userModel";
import dbconnect from "../../../../lib/mongodb";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const user = await User.find({
        _id: req.query.id,
        followers: req.user._id,
      });
      console.log(req.query);
      if (user.length > 0) {
        return res
          .status(400)
          .json({ message: "you already follow this user" });
      }
      const newUser = await User.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.query.id },
        },
        { new: true }
      );
      res.status(200).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
