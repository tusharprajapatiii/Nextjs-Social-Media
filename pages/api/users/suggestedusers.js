import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";
import { verifyAuth } from "/lib/auth";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);

  if (req.method === "GET") {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;

      const users = await User.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
        result: users.length,
      });
    } catch (error) {}
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).send({ error: "Method not allowed" });
  }
}
