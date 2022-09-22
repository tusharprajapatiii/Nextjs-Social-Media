import Image from "next/image";
import React from "react";

function TopPosts({ posts }) {
  console.log(posts);
  return (
    <div className="  md:ml-4 md:w-[87%]  lg:w-[75%] xl:w-[80%] 2xl:w-[84%] flex pt-3 overflow-hidden">
      <div>
        <h1 className="text-base md:text-3xl flex justify-between items-center  p-3 font-bold m-auto">
          Top <br /> Posts
        </h1>
      </div>
      <div className=" flex-1  py-1 items-center flex overflow-x-auto custom-scroll bg-[#fff7f7] rounded-xl ">
        {posts?.map((post, index) => (
          <img
            className="h-24 border-2 shadow-xl w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
            key={index}
            src={post.images[0].url}
            height={"96px"}
            width={"96px"}
            alt="discover post"
          />
        ))}

        {/* <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "} */}
      </div>
    </div>
  );
}

export default TopPosts;
