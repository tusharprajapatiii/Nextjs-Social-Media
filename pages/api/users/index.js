import User from "../../../models/userModel";
import dbconnect from "../../../lib/mongodb";
import { verifyAuth } from "../../../lib/auth";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "GET") {
    try {
      const users = await User.find({});

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
