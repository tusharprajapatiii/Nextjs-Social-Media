import axios from "axios";
import React, { useState } from "react";
import { server } from "../lib/utils";
import { ThumbUpIcon, ChatAlt2Icon } from "@heroicons/react/outline";

function Explore({ posts }) {
  return (
    <div>
      <div className="w-full md:p-3 md:max-w-5xl  bg-white mx-auto  ">
        <h1 className="text-center font-semibold my-2 text-2xl ">
          Explore Top Posts Near you{" "}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-3 gap-2 my-3 md:justify-start justify-center ">
          {posts?.map((post) => (
            <div
              key={post.id}
              className={`mx-1 relative xl:max-h-80 border-2 shadow-md rounded-lg  md:mx-2 group hover:opacity-60 cursor-pointer  p-2 my-2 md:p-4 `}
            >
              <img
                src={post.images[0].url}
                className="h-full w-full rounded-xl  "
                alt="explore"
              />
              <div
                //   onMouseLeave={() => setShow(false)}
                className={`flex opacity-0 group-hover:opacity-100  space-x-4 left-[30%]  absolute bottom-8 items-center justify-between`}
              >
                <span className="flex text-white">
                  <ThumbUpIcon className="h-8 w-8  " />
                  <p>{post.likes.length}</p>
                </span>
                <span className="flex text-white">
                  <ChatAlt2Icon className="h-8 w-8 " />
                  <p>{post.comments.length}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  const res = await axios.get(`${server}/api/posts/discover`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await res.data.posts;
  return {
    props: {
      posts,
    },
  };
};

export default Explore;
