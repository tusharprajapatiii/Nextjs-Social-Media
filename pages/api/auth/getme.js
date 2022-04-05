import { verifyAuth } from "../../../lib/auth";
import dbconnect from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbconnect();
    await verifyAuth(req, res);
    try {
      res.status(200).json(req.user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  res.setHeader("Allow", "GET");
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
