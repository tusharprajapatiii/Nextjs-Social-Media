import dbconnect from "/lib/mongodb";
import { verifyAuth } from "/lib/auth";
import Notify from "/models/notifyModel";
export default async function handler(req, res) {
  await dbconnect();
  await verifyAuth(req, res);
  if (req.method === "PATCH") {
    try {
      const notifies = await Notify.findOneAndUpdate(
        { _id: req.query.id },
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

      return res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const notify = await Notify.findOneAndDelete({
        _id: req.query.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
