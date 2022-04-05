import Image from "next/image";
import React from "react";

function TopPosts() {
  return (
    <div className="  md:ml-4 md:w-[87%]  lg:w-[75%] xl:w-[80%] 2xl:w-[84%] flex pt-3 overflow-hidden">
      <div>
        <h1 className="text-base md:text-3xl flex justify-between items-center  p-3 font-bold m-auto">
          Top <br /> Posts
        </h1>
      </div>
      <div className=" flex-1  py-1 items-center flex overflow-x-auto custom-scroll bg-[#fff7f7] rounded-xl ">
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
        />{" "}
        <img
          className="h-24 neuphor w-24 mx flex-shrink-0 p-1 mx-2   object-cover"
          src="profile.jpg"
          alt=""
        />{" "}
      </div>
    </div>
  );
}

export default TopPosts;
