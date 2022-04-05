import React from "react";
import {
  PhotographIcon,
  EmojiHappyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
function CreatePostInput({ setPost }) {
  return (
    <div className="w-full  lg:sticky top-14 px-3  md:w-4/5 lg:max-w-sm md ">
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
        <PhotographIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 cursor-pointer"
        />
        <EmojiHappyIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 cursor-pointer"
        />
        <PencilAltIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CreatePostInput;
