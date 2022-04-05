import { verifyAuth } from "/lib/auth";
import dbconnect from "/lib/mongodb";
import Post from "/models/postsModel";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "GET") {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 9;

      const posts = await Post.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      return res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
