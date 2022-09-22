import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getConversations } from "../../redux/services/messagesSlice";
import user from "../../redux/services/user";

function LeftSide() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, firstload } = useSelector((state) => state.messages);

  const isActive = (user) => {
    if (router.query.id === user._id) return "border-cyan-400 border-[3px]";
    return "";
  };

  useEffect(() => {
    if (firstload) return;
    dispatch(getConversations());
  }, [dispatch, firstload]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const handleAddUser = (user) => {
    dispatch(addUser({ ...user, text: "" }));
    return router.push(`/messages/${user._id}`);
  };

  return (
    <div
      className={`w-screen  ${
        router.query.id && "hidden lg:block"
      } overflow-y-auto custom-scroll lg:w-1/3`}
    >
      <h1 className="text-center sticky top-0 bg-white py-1 font-bold text-2xl ">
        Chats
      </h1>
      <div className="pr-1">
        {users?.map((user) => {
          return (
            <>
              <div
                onClick={() => handleAddUser(user)}
                className={`flex py-2 border-2 rounded-md shadow-md  min-h-[80px] my-1 cursor-pointer md:py-3 lg:py-1 w-full `}
                key={user._id}
              >
                <div className="w-1/5  flex justify-center items-center">
                  <img
                    src={user.avatar}
                    height={40}
                    width={40}
                    className={`rounded-full   ${isActive(user)} `}
                  />
                </div>
                <div className="pl-3 pr-2 flex-1">
                  <h4 className="font-semibold text-base">{user.username}</h4>
                  <p className="font-medium text-sm ">
                    {user.text?.length > 20
                      ? `${user.text.substring(0, getRandomInt(45, 90))}...`
                      : user.text}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default LeftSide;
