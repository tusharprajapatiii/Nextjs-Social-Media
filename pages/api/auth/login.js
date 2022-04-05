import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export default async function handler(req, res) {
  await dbconnect();
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "please fill all fields" });
      }
      const user = await User.findOne({ email })
        .populate("following followers")
        .populate(
          "followers following",
          "avatar username fullname followers following"
        );
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "wrong password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      if (!token) {
        return res.status(400).json({ message: "please login again" });
      }
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
      );
      res.status(200).json({ status: "loggedIn", token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
