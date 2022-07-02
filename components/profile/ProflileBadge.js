import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowBtn from "./FollowBtn";
import { giveStar } from "../../redux/services/userSlice";
import { useRouter } from "next/router";
import { ChatAltIcon } from "@heroicons/react/solid";
import { addUser } from "../../redux/services/messagesSlice";

function ProflileBadge({ user, setShowFollowers, setShowFollowing }) {
  const router = useRouter();

  const state = useSelector((state) => state.auth);
  const [star, setStar] = useState(false);
  const dispatch = useDispatch();
  const onStarHandler = async () => {
    await dispatch(giveStar(user._id));
    router.replace(router.asPath);
    setStar(true);
  };
  useEffect(() => {
    if (user.stars.find((item) => item === state.user?._id)) {
      setStar(true);
    }
    return () => setStar(false);
  }, [user.stars, state.user?._id]);
  const handleAddUser = (user) => {
    dispatch(addUser({ ...user, text: "" }));
    return router.push(`/messages/${user._id}`);
  };
  return (
    <>
      <div className="min-h-fit mt-3 relative pb-3 md:h-56 md:clay bg-white md:px-6 px-2 flex flex-col md:flex-row md:justify-start justify-center items-center ">
        <img
          className="rounded-full h-40 w-40 object-cover md:h-64 md:w-72 "
          src={(user.avatar && user.avatar) || "/profile2.jpg"}
          alt="profile"
        />
        <div className="flex flex-col  w-full items-center md:items-start  md:pl-4">
          <h1 className="text-lg md:text-2xl  font-semibold">
            {user.username}
          </h1>
          <p className="text-xl md:text-3xl  font-semibold">{user.fullname}</p>
          <p className="hidden font-medium md:block">{user.goal} </p>
        </div>
        <div className="md:hidden font-medium px-4 ">{user.goal}</div>
        {!(user._id === state.user?._id) && (
          <div className="hidden relative mx-2 md:flex ">
            <span
              className="flex flex-col items-center"
              onClick={onStarHandler}
            >
              <StarIcon
                fill={`${star ? "red" : "white"}`}
                className="h-40 cursor-pointer rounded-full clay  ml-1 w-40"
              />
              <h4>Give Star!</h4>
            </span>
            <span className="absolute bottom-4 font-bold text-2xl -right-2">
              {user.stars.length}
            </span>
          </div>
        )}
        {!(user._id === state.user?._id) && (
          <div className="md:hidden relative">
            <span
              className="flex flex-col items-center"
              onClick={onStarHandler}
            >
              <StarIcon
                fill={`${star ? "red" : "white"}`}
                className="h-20 cursor-pointer rounded-full  ml-1 w-20"
              />
              <h4>Give Star!</h4>
            </span>
            <span className="absolute bottom-4 font-bold text-lg -right-2">
              {user.stars.length}
            </span>
          </div>
        )}
        {state.user?._id !== user?._id && (
          <div
            onClick={() => handleAddUser(user)}
            className="clay cursor-pointer hover:scale-110 p-2 absolute top-2 right-2 md:right-1/4 md:top-4 "
          >
            <ChatAltIcon className="h-10 w-10  " />
          </div>
        )}
      </div>
      <div className="mt-6 relative md:clay bg-white pl-8 py-3 space-x-4 md:space-x-8  ">
        <span
          onClick={() => setShowFollowers(true)}
          className="text-sm cursor-pointer"
        >
          {`${user.followers.length}   Followers `}{" "}
        </span>
        <span
          onClick={() => setShowFollowing(true)}
          className="text-sm cursor-pointer"
        >
          {`${user.following.length}   Following `}{" "}
        </span>
        {user._id === state.user?._id && (
          <span className="text-red-600 font-semibold">{`${user.stars.length} stars`}</span>
        )}
        {!(user._id === state.user?._id) && (
          <div className="absolute top-1  right-8">
            {/* <button  className="px-3 border-cyan-400 border-2 rounded-xl font-semibold py-1">
              Follow
            </button> */}
            <FollowBtn user={user} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProflileBadge;
