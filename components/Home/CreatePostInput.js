import React from "react";
import {
  PhotographIcon,
  EmojiHappyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
function CreatePostInput({ setPost }) {
  return (
    <div className="w-full rounded-lg bg-white shadow-md border-2 lg:sticky  px-3 md:w-4/5 lg:max-w-sm  ">
      <div
        onClick={() => setPost(true)}
        className="sm:t-10 mt-6 flex justify-between   items-center "
      >
        <input
          className="rounded-xl cursor-pointer border-[1.5px] border-cyan-500 shadow-md px-3 outline-none  h-14 w-full"
          type="text"
          placeholder="Show something about today"
          disabled
        />
        {/* Show something about today */}
      </div>
      <div className="py-2 px-6 lg:mt-2 flex justify-evenly ">
        <PhotographIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 stroke-3 stroke-red-700 cursor-pointer"
        />
        <EmojiHappyIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 stroke-3 stroke-yellow-500 cursor-pointer"
        />
        <PencilAltIcon
          onClick={() => setPost(true)}
          className="h-6 w-6 stroke-3 stroke-blue-700 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CreatePostInput;
