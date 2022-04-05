import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";
import Post from "../../../models/postsModel";
import Comment from "../../../models/commentModel";

export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "POST") {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).json({ message: "post not found" });
      }
      if (reply) {
        const comment = await Comment.findById(reply);
        if (!comment) {
          return res.status(400).json({ message: "comment not found" });
        }
      }
      const newComments = await new Comment({
        user: req.user._id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });
      await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComments._id } },
        { new: true }
      );
      await newComments.save();
      res
        .status(200)
        .json({ newComments, message: "comment created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
