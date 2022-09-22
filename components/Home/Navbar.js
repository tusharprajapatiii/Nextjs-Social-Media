import React, { useEffect, useState, useRef } from "react";
import {
  HomeIcon,
  SearchIcon,
  GlobeIcon,
  BellIcon,
  UserCircleIcon,
  ChatIcon,
} from "@heroicons/react/solid";
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
import Notifications from "../modals/Notifications";
import useOutsideAlerter from "../componentVisible";
const SearchUser = dynamic(() => import("./searchUser"), { ssr: false });
function Navbar() {
  const router = useRouter();
  const [account, setAccount] = useState(false);
  const [notify, setNotify] = useState(false);
  const dispatch = useDispatch();
  const { searchBar } = useSelector((state) => state.users);
  const { token, user } = useSelector((state) => state.auth);
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, setSearchBar);
  useOutsideAlerter(wrapperRef, setNotify);
  useOutsideAlerter(wrapperRef, setAccount);
  // useOutsideAlerter(wrapperRef, dis);
  useEffect(() => {
    if (!token) router.push("/signup");
  }, [token, router]);
  return (
    <header className="py-2 bg-white  z-30 sticky top-0 w-full  shadow-md  rounded-b-xl ">
      <div className="flex justify-between mx-2 md:mx-6 items-center">
        <div className="flex items-center">
          <div className="rounded-full ">
            <Image
              className="rounded-full m-2 border-2"
              src={"/images.png"}
              width={"55px"}
              height={"40px"}
              alt="profile"
            />
          </div>
          <div
            ref={wrapperRef}
            onClick={() => {
              dispatch(setSearchBar(true)), setNotify(false), setAccount(false);
            }}
            className="flex   relative items-center rounded-xl border-[1px] border-cyan-500 ml-2 md:ml-10 px-2 py-2  "
          >
            <input
              className="hidden cursor-pointer md:inline-block h-5 w-40 border-none outline-none"
              type="text"
              placeholder="Search User.."
              disabled
            />
            <span>
              <SearchIcon className="h-5 w-5 fill-cyan-500 cursor-pointer" />
            </span>
          </div>
        </div>
        <div className="flex relative space-x-5 md:space-x-6 xl:space-x-9 xl:mr-24   ">
          <Tippy content="Home">
            <motion.span
              onClick={() => router.push("/")}
              whileHover={{ scale: 1.2 }}
              className="rounded-full bg-cyan-100  md:p-1"
            >
              <HomeIcon
                color="#22d3ee"
                fill="#22d3ee"
                className="h-7 w-6 stroke-1 stroke-cyan-600 cursor-pointer "
              />
            </motion.span>
          </Tippy>
          <Tippy content="Explore">
            <motion.span
              onClick={() => router.push("/explore")}
              whileHover={{ scale: 1.2 }}
              className="rounded-full bg-cyan-100 md:p-1"
            >
              <GlobeIcon
                fill="#22d3ee"
                color="#22d3ee"
                className="h-7 w-6 stroke-1 stroke-cyan-600 cursor-pointer "
              />
            </motion.span>
          </Tippy>

          <Tippy content="Notification">
            <motion.div
              ref={wrapperRef}
              whileHover={{ scale: 1.2 }}
              className="relative bg-cyan-100 rounded-full  md:p-1"
              onClick={() => {
                setNotify(!notify),
                  setAccount(false),
                  dispatch(setSearchBar(false));
              }}
            >
              <span>
                <BellIcon
                  fill="#22d3ee"
                  className="h-7 stroke-1 stroke-cyan-600  w-6  cursor-pointer"
                />
              </span>
              {/* <span className="absolute text-red-600  rounded-full px-[6px] text-sm font-bold text-center top-[-2px] left-3">
                2
              </span> */}
            </motion.div>
          </Tippy>
          <Tippy content="Chats">
            <motion.div
              onClick={() => router.push("/messages")}
              whileHover={{ scale: 1.2 }}
              className="relative  bg-cyan-100 cursor-pointer md:p-1 rounded-full "
            >
              <span className="cursor-pointer">
                <ChatIcon
                  fill="#22d3ee"
                  className="h-7 w-6  stroke-1 stroke-cyan-600"
                />
              </span>
              {/* <motion.span className="absolute bg-white border-[1px] text-red-500  font-bold rounded-full px-[6px] text-sm text-center top-[-2px] left-3">
                2
              </motion.span> */}
            </motion.div>
          </Tippy>

          <motion.span
            ref={wrapperRef}
            onClick={() => {
              setAccount(!account),
                setNotify(false),
                dispatch(setSearchBar(false));
            }}
            whileHover={{ scale: 1.2 }}
            className="rounded-full relative cursor-pointer bg-cyan-100  md:p-1"
          >
            <UserCircleIcon
              fill="#22d3ee"
              className="h-7 w-6  stroke-1 stroke-cyan-600"
            />
            {account && (
              <div className="absolute w-56 flex flex-col border-2 bg-white text-sm space-y-2 font-semibold items-center top-8 right-0 px-8 py-2 ">
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
      {notify && <Notifications />}
    </header>
  );
}

export default Navbar;
