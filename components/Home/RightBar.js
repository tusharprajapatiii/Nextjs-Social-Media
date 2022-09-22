import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { RefreshIcon } from "@heroicons/react/solid";

import FollowBtn from "../profile/FollowBtn";
function RightBar({ users }) {
  const router = useRouter();
  function refresh() {
    router.replace(router.asPath);
  }

  // const handleFollow = (id) => {
  //   if (users.find((user) => user._id === id)) {
  //     setFollowed(true);
  //   }
  //   dispatch(followUser(users.find((user) => user._id === id)));
  // };
  // // useEffect(() => {
  // //   if (
  // //     user.following.find(
  // //       (item) => item._id === users.find((user) => user._id === id)._id
  // //     )
  // //   ) {
  // //     setFollowed(true);
  // //   }
  // //   return () => setFollowed(false);
  // // }, [user.following, user._id]);

  // const handleUnFollow = (id) => {
  //   if (users.find((user) => user._id === id)) {
  //     setFollowed(true);
  //   }

  //   dispatch(followUser(users.find((user) => user._id === id)));
  // };

  return (
    <div className="hidden min-w-[226px]  shadow-md mt-2 bg-white rounded-md  max-w-[236px] lg:block fixed right-0 h-full">
      <div className="     overflow-y-auto   p-3 max-h-max ">
        <div className="flex justify-between">
          <h1 className="text-base ml-1 mb-1 font-bold">Suggested peoples</h1>
          <span onClick={() => refresh()} className="cursor-pointer">
            <RefreshIcon height={20} />
          </span>
        </div>
        {users.map((user) => {
          const { avatar, username, _id } = user;
          return (
            <motion.div
              key={_id}
              whileHover={{
                scale: 1.05,
                x: 6,
                // backgroundColor: "#00FFFF",
              }}
              className="mx-1 my-1 space-x-3 rounded-xl  relative items-center backdrop-blur-md bg-white/30 flex"
            >
              <div className="rounded-full">
                <Image
                  className="rounded-full"
                  src={"/profile.jpg"}
                  height={"36px"}
                  width={"36px"}
                  objectFit="cover"
                  alt="profile"
                />
              </div>
              <div
                onClick={() => router.push(`/${_id}`)}
                className="flex-1 cursor-pointer hover:text-cyan-400 text-xs font-medium "
              >
                {/* <Link  href={`/${username}`}> */}
                <a>{username}</a>
              </div>
              <FollowBtn user={user} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default RightBar;
