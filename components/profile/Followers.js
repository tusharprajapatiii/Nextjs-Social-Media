import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import FollowBtn from "./FollowBtn";

function Followers({ user, setShowFollowers }) {
  const state = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen max-h-screen w-full flex absolute top-0 left-0  ">
      <div className="inset-x-0 max-w-lg min-w-full md:min-w-[540px] bg-white border-2 shadow-md pb-4 mx-auto relative overflow-y-auto md:h-[450px]  custom-scroll z-40 md:top-16">
        <div className="sticky top-0 py-2 z-10 bg-white mx-2 ">
          <h1 className="text-center text-xl font-bold ">Followers</h1>

          <XIcon
            onClick={() => setShowFollowers(false)}
            className="h-7 w-7 absolute right-4 top-3 cursor-pointer "
          />
        </div>
        <div className="flex flex-col mx-4 overflow-y-auto custom-scroll ">
          {user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <div key={follower._id} className="grid px-6 grid-cols-3 my-2 ">
                <Image
                  src={follower.avatar || "/profile.jpg"}
                  height={"40px"}
                  width={"40px"}
                  alt="avatar"
                  objectFit="contain"
                  className="border-2 relative left-0 rounded-full"
                />
                <Link href={`/${follower._id}`}>
                  <a>
                    <p
                      onClick={() => setShowFollowers(false)}
                      className="font-semibold"
                    >
                      {follower.username}
                    </p>
                  </a>
                </Link>
                <span>
                  {state.user._id !== follower._id && (
                    <FollowBtn user={follower} />
                  )}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold">No Followers</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Followers;
