import dbconnect from "/lib/mongodb";
import { verifyAuth } from "/lib/auth";
import Notify from "/models/notifyModel";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "POST") {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notify({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notify.save();
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const notifies = await Notify.find({ recipients: req.user._id })
        .sort("-createdAt")
        .populate({
          path: "user",
          select: "avatar username fullname",
          model: "User",
        });

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const notifies = await Notify.deleteMany({ recipients: req.user._id });

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
