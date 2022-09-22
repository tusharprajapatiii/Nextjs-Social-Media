import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ThumbUpIcon,
  ChatIcon,
  ShareIcon,
  ArrowCircleRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getFeedPosts,
  likePost,
  reset,
  updatePost,
  createComment,
  unlikePost,
} from "../../redux/services/postsSlice";
// import { createComment } from "../../redux/services/commentsSlice";
// import Comments from "../comment/Comments";
import { useRouter } from "next/router";
import { getUserPosts } from "../../redux/services/userSlice";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("../comment/Comments"), { ssr: false });
function PostCard({ post, me }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [writeEdit, setWriteEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const [comment, showComment] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const { isError, message } = useSelector((state) => state.posts);

  const [commentItems, setCommentItems] = useState({
    postId: post._id,
    content: "",
    postUserId: post.user._id,
  });
  const router = useRouter();
  const handleLike = async () => {
    if (like) {
      setLike(false);
      await dispatch(unlikePost(post._id));
      if (me) dispatch(getUserPosts({ id: user._id, token }));
    } else {
      setLike(true);

      await dispatch(likePost(post._id));
      if (me) dispatch(getUserPosts({ id: user._id, token }));
    }
  };

  useEffect(() => {
    if (writeEdit) setEditContent(post.content);
  }, [writeEdit, post.content]);

  useEffect(() => {
    if (post.likes.find((like) => like._id === user?._id)) {
      setLike(true);
    }
  }, [post.likes, user?._id]);
  const onCommentHandler = async (e) => {
    e.preventDefault();
    setCommentItems({
      ...commentItems,
      content: "",
    });
    await dispatch(createComment(commentItems));
    // if (!me) {
    //   dispatch(getFeedPosts(token));
    // } else {
    //   dispatch(getUserPosts({ user, token }));
    // }
    if (me) dispatch(getUserPosts({ user, token }));
    showComment(true);
  };
  const onCommentChange = (e) => {
    setCommentItems({
      ...commentItems,
      content: e.target.value,
    });
  };
  const onEditHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ id: post._id, content: editContent }));
    if (!me) {
      dispatch(getFeedPosts(token));
    } else {
      dispatch(getUserPosts({ user, token }));
    }
    setWriteEdit(false);
  };

  return (
    <>
      <div
        className={`flex border-2 shadow-md mb-4 bg-white rounded-lg  justify-center md:max-h-[470px] lg:max-h-[inherit] xl:md:max-h-[470px]`}
      >
        <div>
          <Image
            className="rounded-full m-1"
            src={post.user.avatar?.url || "/profile.jpg"}
            height={40}
            width={42}
            objectFit="cover"
          />
        </div>
        <div className="rounded-lg  relative px-3 max-w-md lg:min-w-[100%] lg:max-w-[360px] my-2 flex flex-col md:flex-row lg:flex-col md:min-w-[600px] xl:min-w-[600px] md:max-w-sm xl:flex-row py-2">
          <div>
            <div>
              <h1
                onClick={() => router.push(`/${post.user._id}`)}
                className="text-sm hover:text-cyan-500  cursor-pointer font-[600]"
              >
                {post.user.fullname}
              </h1>
            </div>

            {post.images[0] && (
              <Image
                src={post.images[0].url}
                height={"380px"}
                objectFit="cover"
                width={"350px"}
              />
            )}
          </div>
          <div
            className={` ${
              post.images.length === 0 ? "mt-3  md:pl-3 " : "mt-4"
            }  flex-1 overflow-y-auto relative overflow-x-hidden custom-scroll `}
          >
            <div>
              <div className="sticky top-0 bg-white rounded-lg z-10">
                {!writeEdit ? (
                  <p className="text-xs md:text-sm p-1 font-medium">
                    {post.content}
                  </p>
                ) : (
                  <div className="relative top-1 ">
                    <textarea
                      ref={(ref) => {
                        if (ref) {
                          ref.focus();
                        }
                      }}
                      className="text-xs md:text-sm p-1  w-full outline-none border-2 overflow-hidden rounded-lg font-medium"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button
                      onClick={onEditHandler}
                      className="absolute right-1 bg-white rounded-md border-2  text-sm px-1 bottom-1"
                    >
                      save
                    </button>
                    <button
                      onClick={() => setWriteEdit(false)}
                      className="absolute border-2 top-0 bg-white text-sm rounded-lg px-1  right-0"
                    >
                      {" "}
                      cancel{" "}
                    </button>
                  </div>
                )}
                <div className="justify-evenly px-2 flex  ">
                  <div>
                    <button onClick={handleLike} className=" p-1">
                      <ThumbUpIcon
                        fill={` ${like ? "#22d3ee" : "white"} `}
                        className={`h-5 stroke-2 stroke-cyan-500 w-5`}
                      />
                    </button>

                    <span className="text-sm font-bold">
                      {post.likes.length > 0 && post.likes.length}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => showComment(!comment)}
                      className=" p-1"
                    >
                      <ChatIcon
                        className={`h-5 ${
                          comment && "fill-cyan-500"
                        } stroke-2 stroke-cyan-600 w-5`}
                      />
                    </button>
                    <span className="text-sm font-bold">
                      {post.comments.length === 0 ? "" : post.comments.length}
                    </span>
                  </div>
                  <button className=" p-1">
                    <ShareIcon className="h-5 w-5 stroke-2 stroke-cyan-600" />
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-[600]">Add a comment</h3>
                  <div className="flex items-center">
                    <Image
                      className="rounded-full"
                      src={user?.avatar.url || "/profile.jpg"}
                      height={24}
                      objectFit="cover"
                      width={24}
                    />
                    <form
                      className="flex items-center "
                      onSubmit={onCommentHandler}
                    >
                      <textarea
                        value={commentItems.content}
                        onChange={onCommentChange}
                        className="border-[1px] border-cyan-500  outline-none rounded-xl mx-1 text-xs max-h-28  font-medium overflow-hidden  p-[6px] w-[100%]   "
                      ></textarea>
                      <button type="submit">
                        <ArrowCircleRightIcon className="h-6 w-6 stroke-2 stroke-cyan-400 mx-1 " />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <Comments me={me} comment={comment} post={post} />
            </div>
          </div>

          {post.user._id === user._id && (
            <DotsHorizontalIcon
              onClick={() => setOpenEdit(!openEdit)}
              className="h-5 w-5 cursor-pointer text-cyan-600 z-20 absolute top-2  right-6"
            />
          )}
          {openEdit && (
            <div className="absolute top-4 border-2 z-20 font-semibold space-y-2 text-sm  px-6 py-2  bg-white  right-[20%] md:right-[8%] xl:right-[8%] lg:right-[12%] ">
              <h1
                onClick={() => {
                  setWriteEdit(true), setOpenEdit(false);
                }}
                className="cursor-pointer"
              >
                edit
              </h1>
              <h2
                onClick={async () => {
                  await dispatch(deletePost(post._id)),
                    dispatch(getFeedPosts(token)),
                    setOpenEdit(false);
                  console.log(post._id);
                }}
                className="cursor-pointer"
              >
                delete
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostCard;
