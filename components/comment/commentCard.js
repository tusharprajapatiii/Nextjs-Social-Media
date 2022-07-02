import React, { useEffect, useState } from "react";
import {
  ThumbUpIcon,
  ArrowCircleRightIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from "../../redux/services/commentsSlice";
import { getFeedPosts } from "../../redux/services/postsSlice";
import { getUserPosts } from "../../redux/services/userSlice";
function CommentCard({ comment, replies, me }) {
  const [reply, setReply] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [cmreply, setcmreply] = useState([]);
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const [repyItems, setReplyItems] = useState({
    postId: comment.postId,
    content: "",
    postUserId: comment.postUserId,
    reply: comment._id,
    tag: user,
  });
  const handleLike = async () => {
    if (like) {
      await dispatch(unlikeComment(comment._id));
      setLike(false);
      if (!me) {
        dispatch(getFeedPosts(token));
      } else {
        dispatch(getUserPosts({ user, token }));
      }
    } else {
      await dispatch(likeComment(comment._id));
      setLike(true);

      if (!me) {
        dispatch(getFeedPosts(token));
      } else {
        dispatch(getUserPosts({ user, token }));
      }
    }
  };
  const onReplyHandler = async (e) => {
    e.preventDefault();
    await dispatch(createComment(repyItems));
    if (me) {
      dispatch(getUserPosts({ user, token }));
    } else {
      dispatch(getFeedPosts(token));
    }
    setReplyItems({
      ...repyItems,
      content: "",
    });
    setReply(false);
    setViewReply(true);
  };
  useEffect(() => {
    const rep = replies.filter((cm) => cm.reply === comment._id);
    setcmreply(rep);
  }, [replies]);

  return (
    <div className="relative">
      <div className="flex relative mx-[2px]">
        <div>
          <Image
            className="rounded-full"
            src={comment?.user?.avatar?.id || "/profile.jpg"}
            height={"20px"}
            width={"20px"}
            objectFit="cover"
            alt="avatar"
          />
        </div>
        <div className="  border-2 p-[6px] w-[100%]  mx-1 my-[2px] max-w-[85%] clay  rounded-xl text-xs">
          {comment.content.length > 80
            ? `${comment.content.substring(0, 80)}...`
            : comment.content}
          {comment.content.length > 80 ? (
            <button className="text-[10px] text-red-500">see more</button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex items-center w-[80%]  relative left-6 space-x-6 px-3">
        {/* <ThumbUpIcon
          onClick={handleLike}
          fill={like ? "cyan" : "white"}
          className="h-3 w-3 cursor-pointer"
        /> */}
        <div className="text-[10px] flex">
          <ThumbUpIcon
            onClick={handleLike}
            fill={like ? "cyan" : "white"}
            className="h-3 w-3 cursor-pointer"
          />
          <span>{comment.likes?.length > 0 ? comment.likes?.length : ""}</span>
        </div>
        <button
          onClick={() => setReply(!reply)}
          className="text-[9px] font-semibold "
        >
          {reply ? "close" : "reply"}
        </button>
        <button
          onClick={() => setViewReply(!viewReply)}
          className="text-[8px] font-semibold"
        >
          {" "}
          {viewReply ? "close replies" : "view replies"}
        </button>
      </div>
      <div>
        {reply && (
          <form className="flex relative  left-16 ">
            <textarea
              value={repyItems.content}
              onChange={(e) =>
                setReplyItems({ ...repyItems, content: e.target.value })
              }
              className=" text-xs overflow-hidden  h-8 clay p-1 max-h-8  outline-none  border-b-2"
            ></textarea>
            <button onClick={onReplyHandler} type="submit">
              <ArrowCircleRightIcon className="h-5 w-5  mx-1 " />
            </button>
          </form>
        )}
      </div>
      <div>
        {viewReply &&
          (cmreply.length > 0 ? (
            cmreply.map((reply) => (
              <div key={cmreply._id} className="pl-8">
                <div className="flex items-center ">
                  <div>
                    <Image
                      className="rounded-full"
                      src={reply?.user?.avatar?.id || "/profile.jpg"}
                      height={"18px"}
                      width={"18px"}
                      objectFit="cover"
                      alt="avatar"
                    />
                  </div>
                  <div className="  border-2 p-[6px] w-[100%]  mx-1 my-[2px] max-w-[85%] clay  rounded-xl text-[10px]">
                    {reply.content.length
                      ? `${reply.content.substring(0, 80)}...`
                      : reply.content}
                    {reply.content.length > 80 ? (
                      <button className="text-[10px] text-red-500">
                        see more
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <span className="text-[8px]">
                    {" "}
                    <ThumbUpIcon className="h-[.65rem] w-[.65rem]" />
                    {reply.likes.length > 0 ? reply.likes.length : ""}
                  </span> */}
                </div>
                <div className="flex  w-[80%]  relative left-6  px-3">
                  <ThumbUpIcon
                    onClick={handleLike}
                    className="h-[0.65rem] cursor-pointer w-[.65rem]"
                  />
                  <span className="text-[9px]">
                    {/* {reply.likes.length > 0 ? reply.likes.length : ""} */}0
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[9px] text-center ">no replies</p>
          ))}
      </div>

      <div className="absolute bottom-5 right-5 ">
        <TrashIcon
          onClick={async () => {
            await dispatch(deleteComment(comment._id)),
              dispatch(getFeedPosts(token));
          }}
          className="h-4 w-4  lg:h-3 lg:w-3 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CommentCard;
