import cookie from "cookie";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
    );
    res.status(200).json({ status: "loggedOut" });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
