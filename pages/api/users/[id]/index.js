import User from "/models/userModel";
import dbconnect from "../../../../lib/mongodb";
import { verifyAuth } from "../../../../lib/auth";
import Post from "/models/postsModel";
import Comment from "/models/commentModel";
import cloudinary from "cloudinary";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);

  if (req.method === "GET") {
    try {
      const user = await User.findById(req.query.id)
        .select("-password")
        .populate("followers following", "-password");

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
