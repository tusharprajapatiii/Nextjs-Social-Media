import dbconnect from "../../../lib/mongodb";
import transporter from "../../../lib/sendEmail";
import User from "../../../models/userModel";
import { server } from "../../../lib/utils";
export default async function handler(req, res) {
  await dbconnect();
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "please provide email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }
    const random = Math.floor(Math.random() * 1000);
    const token = user._id;
    const resetUrl = `${server}/signup?resetToken=${token}&id=${random}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;
    try {
      await transporter.sendMail({
        from: "prajapatitushar789@gmail.com",
        to: user.email,
        subject: "Reset Password",
        text: message,
        html: `<p>Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.</p>`,
      });

      res.status(200).json({ message: "email sent" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
