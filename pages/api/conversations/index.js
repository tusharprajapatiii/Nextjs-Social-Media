import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import Conversation from "/models/conversationModel";
import APIfeatures from "../../../lib/features";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "GET") {
    try {
      const features = new APIfeatures(
        Conversation.find({
          recipients: req.user._id,
        }),
        req.query
      ).paginate();

      const conversations = await features.query
        .sort("-updatedAt")
        .populate("recipients", "avatar username fullname");

      res.json({
        conversations,
        result: conversations.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
