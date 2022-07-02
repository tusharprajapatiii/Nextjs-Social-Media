import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  GlobeIcon,
  BellIcon,
  UserCircleIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { motion } from "framer-motion";
import { logout } from "../../redux/services/auth";
import { setSearchBar } from "../../redux/services/userSlice";
// import SearchUser from "./searchUser";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const SearchUser = dynamic(() => import("./searchUser"), { ssr: false });
function Navbar() {
  const router = useRouter();
  const [account, setAccount] = useState(false);
  const dispatch = useDispatch();
  const { searchBar } = useSelector((state) => state.users);
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) router.push("/signup");
  }, [token, router]);
  return (
    <header className="py-2 z-10 sticky top-0 w-full head-clay shadow-xl rounded-b-xl ">
      <div className="flex justify-between mx-2 md:mx-6 items-center">
        <div className="flex items-center">
          <div className="rounded-full clay">
            <Image
              className="rounded-full m-2 border-2"
              src={"/images.png"}
              width={"55px"}
              height={"40px"}
              alt="profile"
            />
          </div>
          <div
            onClick={() => dispatch(setSearchBar(true))}
            className="flex  clay relative items-center rounded-2xl border-2 ml-2 md:ml-10 px-2 py-2  "
          >
            <input
              className="hidden cursor-pointer md:inline-block h-5 w-40 border-none outline-none"
              type="text"
              placeholder="Search User.."
              disabled
            />
            <span>
              <SearchIcon className="h-5 w-5 cursor-pointer" />
            </span>
          </div>
        </div>
        <div className="flex space-x-4 md:space-x-6 xl:space-x-9 xl:mr-24   ">
          <Tippy content="Home">
            <motion.span
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.2 }}
              className="rounded-full clay  md:p-1"
            >
              <HomeIcon className="h-7 w-6 cursor-pointer " />
            </motion.span>
          </Tippy>
          <Tippy content="Explore">
            <motion.span
              onClick={() => router.push("/explore")}
              whileHover={{ scale: 1.2 }}
              className="rounded-full clay md:p-1"
            >
              <GlobeIcon className="h-7 w-6 cursor-pointer " />
            </motion.span>
          </Tippy>

          <Tippy content="Notification">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative rounded-full  md:p-1"
            >
              <span>
                <BellIcon className="h-7  w-6 clay cursor-pointer" />
              </span>
              <span className="absolute text-red-600 clay rounded-full px-[6px] text-sm font-bold text-center top-[-2px] left-3">
                2
              </span>
            </motion.div>
          </Tippy>
          <Tippy content="Chats">
            <motion.div
              onClick={() => router.push("/messages")}
              whileHover={{ scale: 1.2 }}
              className="relative  cursor-pointer md:p-1 rounded-full "
            >
              <span className="cursor-pointer">
                <ChatIcon className="h-7 w-6 clay  " />
              </span>
              <motion.span className="absolute text-red-500 clay font-bold rounded-full px-[6px] text-sm text-center top-[-2px] left-3">
                2
              </motion.span>
            </motion.div>
          </Tippy>

          <motion.span
            onClick={() => setAccount(!account)}
            whileHover={{ scale: 1.2 }}
            className="rounded-full relative cursor-pointer clay  md:p-1"
          >
            <UserCircleIcon className="h-7 w-6  " />
            {account && (
              <div className="absolute w-56 flex flex-col text-sm space-y-2 font-semibold items-center top-8 right-0 px-8 py-2 clay">
                <Link href={`/${user?._id}`}>
                  <a>
                    <div className="flex space-y-2 px-1 justify-between">
                      {/* <Image
                        src={user.avatar  }
                        height="20px"
                        width={"22px"}
                        className="rounded-full "
                      /> */}
                      <h4 className="ml-4">See profile</h4>
                    </div>
                  </a>
                </Link>
                <h4>switch</h4>
                <h4 onClick={() => dispatch(logout())}>Logout</h4>
              </div>
            )}
          </motion.span>
        </div>
      </div>
      {searchBar && <SearchUser />}
    </header>
  );
}

export default Navbar;
