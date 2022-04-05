import React, { useState, useEffect } from "react";
import { followUser, unFollowUser } from "../../redux/services/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
function FollowBtn({ user }) {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = async () => {
    await dispatch(followUser(user._id));
    setFollowed(true);

    router.replace(router.asPath);
  };
  const router = useRouter();

  const state = useSelector((state) => state.auth);
  useEffect(() => {
    if (user.followers.find((i) => i._id === state.user?._id)) {
      setFollowed(true);
    }
    return () => {
      setFollowed(false);
    };
  }, [user.followers, state.user?._id]);

  const handleUnFollow = async () => {
    await dispatch(unFollowUser(user._id));
    setFollowed(false);

    router.replace(router.asPath);
  };
  return (
    <div>
      {!followed ? (
        <motion.button
          onClick={handleFollow}
          whileTap={{
            scale: 0.8,
          }}
          className={`rounded-lg  hover:block text-xs  ${
            router.query.id && "text-lg md:px-2"
          } p-1 border-[1px] clay border-slate-500 bg-cyan-300`}
        >
          Follow
        </motion.button>
      ) : (
        <motion.button
          onClick={handleUnFollow}
          whileTap={{
            scale: 0.8,
          }}
          className={`rounded-lg text-red-500 hover:block ${
            router.query.id && "text-lg md:px-2"
          } text-[10px] p-1 border-[1px] clay border-slate-500 bg-cyan-300`}
        >
          unFollow
        </motion.button>
      )}
    </div>
  );
}

export default FollowBtn;
