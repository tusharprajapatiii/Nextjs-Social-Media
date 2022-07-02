import React from "react";
import LeftSide from "../../components/messages/LeftSide";

function MessagePage() {
  return (
    <div>
      <div className="max-w-6xl h-[calc(100vh-72px)] flex mx-auto mt-2 bg-white ">
        <LeftSide />
        <hr className="h-[80%] border-l-[1.5px] mb-10 mt-8 " />
        <div className=" hidden lg:flex flex-1 justify-center items-center   ">
          <div className="max-h-fit -mt-24 p-2">
            <h1 className="text-center font-bold text-3xl">Messages</h1>
            <p className="text-xl font-medium">Select any messages to open</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
