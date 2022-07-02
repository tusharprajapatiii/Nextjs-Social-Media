import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  await dbconnect();

  if (req.method === "POST") {
    try {
      const {
        email,
        password,
        fullname,
        avatar,
        username,
        birthdate,
        goal,
        mobile,
        gender,
      } = req.body;
      const isEmail = await User.findOne({ email });
      if (isEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const isUserName = await User.findOne({ username });
      if (isUserName) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = await new User({
        email,
        password,
        fullname,
        avatar,
        username,
        birthdate,
        goal,
        mobile,
        gender,
      }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      if (!token) {
        return res.status(400).json({ message: "please register again" });
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
      await user.save();

      res.status(201).json({ status: "ok", token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
