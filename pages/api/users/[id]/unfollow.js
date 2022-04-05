import User from "/models/userModel";
import { verifyAuth } from "/lib/auth";
import dbconnect from "../../../../lib/mongodb";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.query.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.query.id },
        },
        { new: true }
      );

      res.status(200).json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
