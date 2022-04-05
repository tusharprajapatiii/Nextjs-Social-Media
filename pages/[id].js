import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { server } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import ProflileBadge from "../components/profile/ProflileBadge";
import InfoBadge from "../components/profile/InfoBadge";
import {
  PhotographIcon,
  EmojiHappyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import PostCard from "../components/Home/PostCard";
import { getUserPosts } from "../redux/services/userSlice";
import Followers from "../components/profile/Followers";
import Following from "../components/profile/following";
function Profiles({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.users);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [post, setPost] = useState(false);
  useEffect(() => {
    if (!state.token) router.push("/signup");
  }, [state.token, router]);
  useEffect(() => {
    dispatch(getUserPosts({ id: user._id, token: state.token }));
  }, [user._id, dispatch, state.token]);
  return (
    <div>
      <div className="mx-auto max-w-5xl ">
        <ProflileBadge
          setShowFollowers={setShowFollowers}
          setShowFollowing={setShowFollowing}
          user={user}
        />
        <h1 className="text-center text-3xl font-extrabold my-1 ">
          {" "}
          My Journey{" "}
        </h1>
        <div className="xl:flex">
          <InfoBadge user={user} />
          <div className="flex-1  flex-col items-center justify-center ">
            <div className="w-full mx-auto max-w-lg   px-3  ">
              <div
                onClick={() => setPost(true)}
                className="sm:t-10 mt-6 flex justify-between  clay items-center "
              >
                <input
                  className="rounded-xl cursor-pointer  px-3 outline-none  h-14 w-full"
                  type="text"
                  placeholder="Show something about today"
                  disabled
                />
                {/* Show something about today */}
              </div>
              <div className="py-2 px-6 lg:mt-2 flex justify-evenly clay">
                <PhotographIcon className="h-6 w-6 cursor-pointer" />
                <EmojiHappyIcon className="h-6 w-6 cursor-pointer" />
                <PencilAltIcon className="h-6 w-6 cursor-pointer" />
              </div>
            </div>
            <div>
              {posts?.map((post) => (
                <PostCard me key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showFollowers && (
        <Followers setShowFollowers={setShowFollowers} user={user} />
      )}
      {showFollowing && (
        <Following user={user} setShowFollowing={setShowFollowing} />
      )}
    </div>
  );
}

export default Profiles;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await axios.get(`${server}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${ctx.req.cookies.token}`,
    },
  });

  return {
    props: {
      user: res.data.user,
    },
  };
};
