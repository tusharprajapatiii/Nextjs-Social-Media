import { useSelector } from "react-redux";
import React from "react";
import PostCard from "./PostCard";
function PostList() {
  const { feedPosts, isLoading } = useSelector((state) => state.posts);

  // if (isLoading) {
  //   return (
  //     <div className=" w-full lg:w-[inherit] lex justify-center items-center">
  //       <svg
  //         class="animate-spin h-20 w-20 text-red-800 animate-spin mr-3 ..."
  //         viewBox="0 0 24 24"
  //       ></svg>
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
