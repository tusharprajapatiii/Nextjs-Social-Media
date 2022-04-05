import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    text: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Conversation ||
  mongoose.model("Conversation", conversationSchema);
