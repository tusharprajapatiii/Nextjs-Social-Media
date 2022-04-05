import dbconnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
  await dbconnect();
  if (req.method === "GET") {
    try {
      const users = await User.find({
        username: { $regex: req.query.username, $options: "i" },
      })
        .limit(10)
        .select("fullname username avatar");
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
