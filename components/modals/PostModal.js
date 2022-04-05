import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  PhotographIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";

import {
  createPost,
  getFeedPosts,
  reset,
} from "../../redux/services/postsSlice";
function PostModal({ setPost }) {
  const [postItems, setPostItems] = useState({
    content: "",
    images: [],
  });
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.posts
  );
  const { user, token } = useSelector((state) => state.auth);
  const [previewImage, setPreviewImage] = useState([]);
  const onChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    setPostItems({ ...postItems, images: [] });
    setPreviewImage([]);
    if (files.length > 4) {
      toast.error("You can only upload 4 images");
      return;
    }
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage((prev) => [...prev, reader.result]);
          setPostItems({
            ...postItems,
            images: [...postItems.images, reader.result],
          });
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(postItems, previewImage);
  };
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) setPost(false);
    dispatch(reset());
  }, [isError, isSuccess, message]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createPost(postItems));
    dispatch(getFeedPosts(token));
  };

  return (
    <div className="absolute  overflow-y-auto p-3 clay top-0 left-0 h-screen z-50 md:w-[70%] md:left-[15%] md:h-[60%] md:top-[15%] md:p-2 xl:h-[80%] xl:top-[8%] bg-white w-full">
      <div className="relative  ">
        <h1 className="text-center text-3xl  ">Create Post</h1>
        <XIcon
          onClick={() => {
            setPost(false), setPostItems({ content: "", images: [] });
          }}
          className="h-8 w-8 absolute cursor-pointer right-2 top-0"
        />
      </div>
      <div>
        <div className="flex ml-4 mt-6 ">
          <Image
            className="mx-2"
            src="/profile2.jpg"
            height={30}
            width={30}
            objectFit="cover"
          />
          <h4 className="mx-4">{user?.username}</h4>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="px-4 my-4 clay">
            <textarea
              value={postItems.content}
              onChange={(e) =>
                setPostItems({
                  ...postItems,
                  content: e.target.value,
                })
              }
              className="w-full max-h-40 outline-none rounded-xl min-h-[50px] border-2"
            />
          </div>
          <div className="flex justify-evenly">
            <div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="/image/*"
                id="post"
                name="post"
                maxLength={4}
                onChange={onChangeHandler}
              />
              <label htmlFor="post">
                <PhotographIcon className="h-8 w-8 cursor-pointer" />
              </label>
            </div>
            <EmojiHappyIcon className="h-8 w-8 cursor-pointer" />
            <PencilAltIcon className="h-8 w-8 cursor-pointer" />
          </div>
          <div className="flex justify-center items-center">
            <button
              disabled={!postItems.content && !postItems.images.length > 0}
              type="submit"
              className={`px-3 py-1 my-1 border-2  ${
                !postItems.content &&
                !postItems.images.length > 0 &&
                "opacity-40"
              } bg-cyan-600 ${
                isLoading && "opacity-20"
              } text-white font-semibold rounded-2xl`}
            >
              {" "}
              Post
            </button>
          </div>
        </form>
        <div className="flex justify-center flex-wrap">
          {previewImage.map((image, index) => (
            <div
              key={index}
              className="relative border-2 border-cyan-300 mx-1 rounded-lg clay "
            >
              <Image key={index} src={image} height={150} width={150}></Image>
              <XIcon
                onClick={() =>
                  setPreviewImage(previewImage.filter((_, i) => i !== index))
                }
                className="absolute cursor-pointer z-10 top-0 right-2 h-4 w-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostModal;
