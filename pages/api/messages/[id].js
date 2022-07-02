import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import Message from "/models/messageModel";
import APIfeatures from "../../../lib/features";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "GET") {
    try {
      const features = new APIfeatures(
        Message.find({
          $or: [
            { sender: req.user._id, recipient: req.query.id },
            { sender: req.query.id, recipient: req.user._id },
          ],
        }),
        req.query
      ).paginate();

      const messages = await features.query.sort("-createdAt");

      res.json({
        messages,
        result: messages.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await Message.findOneAndDelete({
        _id: req.query.id,
        sender: req.user._id,
      });
      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
