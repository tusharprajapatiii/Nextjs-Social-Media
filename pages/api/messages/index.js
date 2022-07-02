import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import Message from "/models/messageModel";
import Conversation from "/models/conversationModel";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "POST") {
    try {
      const { sender, recipient, text } = req.body;

      if (!recipient || !text.trim()) return;

      const newConversation = await Conversation.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          text,
        },
        { new: true, upsert: true }
      );

      const newMessage = new Message({
        conversation: newConversation._id,
        sender,

        recipient,
        text,
      });

      await newMessage.save();

      res.json({ message: "Create Success!",newMessage });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
