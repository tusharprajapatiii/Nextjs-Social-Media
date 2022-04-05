import { useRouter } from "next/router";
import React from "react";
import Navbar from "./Home/Navbar";
function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      {router.pathname === "/signup" ? null : <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
