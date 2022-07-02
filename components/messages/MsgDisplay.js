import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/services/messagesSlice";

function MsgDisplay({ user, msg, messages }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleDeleteMessages = () => {
    if (!messages) return;

    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessage({ message: msg, data: messages }));
    }
  };
  return (
    <>
      <div className="clay p-3 relative my-1 group ">
        <div className="flex">
          <img src={user?.avatar} className="rounded-full h-7 w-7 cover mx-1" />
          <div className="flex-1">
            <p className="text-sm font-semibold "> {user.username}</p>
            <p className="text-sm">{msg.text}</p>
          </div>
        </div>
        <div className="text-[9px]">
          {new Date(msg.createdAt).toLocaleString()}
        </div>
        <button
          onClick={handleDeleteMessages}
          className={`absolute opacity-0 group-hover:opacity-100 bottom-2 ${
            user._id === auth.user._id ? "-left-3" : "-right-3"
          } `}
        >
          <TrashIcon fill="red" className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

export default MsgDisplay;
