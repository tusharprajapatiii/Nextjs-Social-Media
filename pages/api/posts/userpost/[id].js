import Post from "/models/postsModel";
import APIfeatures from "../../../../lib/features";
import dbconnect from "../../../../lib/mongodb";
import { verifyAuth } from "../../../../lib/auth";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "GET") {
    try {
      const features = new APIfeatures(
        Post.find({ user: req.query.id }),
        req.query
      ).paginate();
      const posts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            model: "User",
            select: "-password",
          },
        });

      res.json({
        posts,
        result: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
