import React, { useState, useEffect } from "react";
import CommentCard from "./commentCard";
function Comments({ comment, post, me }) {
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  useEffect(() => {
    const newComments = post.comments.filter((cm) => !cm.reply);
    setComments(newComments);
  }, [post.comments]);
  useEffect(() => {
    const replies = post.comments.filter((cm) => cm.reply);
    setReplyComments(replies);
  }, [post.comments]);

  return (
    <>
      {comment && (
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                me={me}
                comment={comment}
                replies={replyComments}
              />
            ))
          ) : (
            <p className="text-center text-base font-semibold">No comments</p>
          )}
        </div>
      )}
    </>
  );
}

export default Comments;
