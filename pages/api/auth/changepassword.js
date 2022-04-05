import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);

  if (req.method === "PATCH") {
    try {
      const { password, newpassword } = req.body;
      if (!password || !newpassword) {
        return res.status(400).json({ message: "please fill all fields" });
      }
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return res.status(400).json({ message: "please login first" });
      }
      if (!(await user.comparePassword(password))) {
        return res.status(401).json({ message: "current password is wrong" });
      }

      user.password = newpassword;
      await user.save();
      res.status(200).json({ message: "password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
