import { useSelector } from "react-redux";
import React from "react";
import PostCard from "./PostCard";
import { CubeTransparentIcon } from "@heroicons/react/outline";
function PostList() {
  const { feedPosts, isLoading } = useSelector((state) => state.posts);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center  w-full lg:w-[inherit] items-center pt-10">
  //       <CubeTransparentIcon className="h-8 w-8 text-center mx-auto " />
  //     </div>
  //   );
  // }
  return (
    <div className="px-1 w-full lg:w-[inherit] relative top-0  my-3">
      {feedPosts.length > 0 ? (
        feedPosts?.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <div className="font-semibold text-center my-8 ml-8 text-xl">
          No posts, create post or follow to see posts
        </div>
      )}
    </div>
  );
}

export default PostList;
