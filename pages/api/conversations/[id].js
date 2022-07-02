import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import Message from "/models/messageModel";
import Conversation from "/models/conversationModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "DELETE") {
    try {
      const newConver = await Conversation.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.query.id] },
          { recipients: [req.query.id, req.user._id] },
        ],
      });
      await Message.deleteMany({ conversation: newConver._id });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
