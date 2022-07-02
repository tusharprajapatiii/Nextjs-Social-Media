import { ArrowCircleRightIcon, TrashIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConversation,
  getMessages,
  loadMoreMessages,
  postMessage,
} from "../../redux/services/messagesSlice";
import MsgDisplay from "./MsgDisplay";

function RightSide() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);
  const { data, users } = useSelector((state) => state.messages);
  const auth = useSelector((state) => state.auth);
  const refDisplay = useRef();
  const pageEnd = useRef();
  useEffect(() => {
    const newData = data.find((item) => item._id === id);
    if (newData) {
      setMessages(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [data, id]);

  useEffect(() => {
    if (id && users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);

      const newUser = users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [users, id]);

  useEffect(() => {
    const getMessagesData = async () => {
      if (data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ id }));
        setTimeout(() => {
          refDisplay.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteConversation(id));
      return router.push("/messages");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setText("");
    const message = {
      sender: auth.user._id,
      recipient: id,
      text,
      createdAt: new Date().toISOString(),
    };

    await dispatch(postMessage({ message }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <>
      {user.avatar && (
        <div className="flex justify-between border-b-2 ">
          <div className="p-1 flex ">
            <Image
              className="rounded-full"
              src={user?.avatar}
              height={40}
              width={40}
              objectFit="contain"
            />
            <div className="ml-4">
              <h4 className="font-bold text-lg ">{user.username}</h4>
            </div>
          </div>

          <div className="pr-4 flex justify-center items-center ">
            <TrashIcon
              onClick={handleDeleteConversation}
              className="h-7 w-7 cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="h-[calc(100%-90px)] relative px-2 overflow-y-auto custom-scroll ">
        <div className="w-full min-h-full " ref={refDisplay}>
          <button className="-mt-7 opacity-0" ref={pageEnd}>
            load more
          </button>

          {messages?.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === auth.user._id ? "flex justify-end" : "flex"
              }
            >
              {msg.sender !== auth.user._id && (
                <div className=" max-w-[65%] ">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className=" max-w-[65%]  ">
                  <MsgDisplay user={auth.user} msg={msg} messages={messages} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex bottom-2 border-2 w-full bg-white h-10 relative "
      >
        <textarea
          onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          className="w-full max-h-8 overflow-hidden "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="flex justify-center items-center">
          <ArrowCircleRightIcon className="h-6 w-6 my-1 mx-2 " />
        </button>
      </form>
    </>
  );
}

export default RightSide;
