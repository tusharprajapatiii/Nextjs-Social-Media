import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import FollowBtn from "./FollowBtn";

function Following({ user, setShowFollowing }) {
  const state = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen max-h-screen w-full flex absolute top-0 left-0  ">
      <div className=" max-w-lg min-w-full md:min-w-[540px] clay pb-4 mx-auto relative overflow-y-auto custom-scroll md:h-[450px] z-40 md:top-16">
        <div className="sticky top-0 py-2 mx-2 z-10 bg-white">
          <h1 className="text-center relative text-xl top-0 font-bold ">
            Following
          </h1>
          <XIcon
            onClick={() => setShowFollowing(false)}
            className="h-7 w-7 absolute right-4 top-3 cursor-pointer "
          />
        </div>
        <div className="flex flex-col mx-4  ">
          {user.following.length > 0 ? (
            user.following.map((following) => {
              return (
                <div
                  key={following._id}
                  className="grid px-6 grid-cols-3 my-2   "
                >
                  <Image
                    src={following.avatar || "/profile.jpg"}
                    height={"40px"}
                    width={"40px"}
                    alt="avatar"
                    objectFit="contain"
                    className="border-2  rounded-full"
                  />
                  <Link href={`/${following._id}`}>
                    <a>
                      <p
                        onClick={() => setShowFollowing(false)}
                        className="font-semibold"
                      >
                        {following.username}
                      </p>
                    </a>
                  </Link>
                  <span>
                    {state.user._id !== following._id && (
                      <FollowBtn user={following} />
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-lg font-semibold">No Following</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Following;
