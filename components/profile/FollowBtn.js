import React, { useState, useEffect } from "react";
import { followUser, unFollowUser } from "../../redux/services/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
function FollowBtn({ user }) {
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.user?.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user?.following, user._id]);
  const handleUnFollow = async () => {
    await dispatch(unFollowUser({ user, users, id: user._id }));
    setFollowed(false);
  };
  const handleFollow = async () => {
    await dispatch(followUser({ user, users, id: user._id }));
    setFollowed(true);
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
