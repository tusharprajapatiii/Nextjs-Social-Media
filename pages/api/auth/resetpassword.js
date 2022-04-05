import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
  await dbconnect();
  if (req.method === "POST") {
    try {
      console.log(req.query);
      const { resetToken, id } = req.query;
      if (!resetToken || !id) {
        return res
          .status(400)
          .json({ message: "please click forgot password again" });
      }
      const user = await User.findOne({ _id: resetToken });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      const { password, passwordConfirm } = req.body;
      if (!password || !passwordConfirm) {
        return res.status(400).json({ message: "please fill all fields" });
      }
      if (password !== passwordConfirm) {
        return res.status(400).json({ message: "password not matched" });
      }
      user.password = password;
      await user.save();
      res.status(200).json({ message: "password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
