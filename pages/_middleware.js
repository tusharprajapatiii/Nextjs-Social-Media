import { NextResponse } from "next/server";
import { server } from "../lib/utils";

export function middleware(req, res) {
  // const { token } = req.cookies;
  // if (req.nextUrl.pathname === "/") {
  //   if (!token) {
  //     return NextResponse.redirect(`${server}/signup`);
  //   }
  // }
  // return NextResponse.next();
}
