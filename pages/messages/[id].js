import React from "react";
import LeftSide from "../../components/messages/LeftSide";
import RightSide from "../../components/messages/RightSide";

function SingleMessage() {
  return (
    <div>
      <div className="max-w-6xl h-[calc(100vh-72px)] flex mx-auto mt-2 bg-white ">
        <LeftSide />
        <hr className="h-[80%] border-l-[1.5px] ml-2 my-8 " />
        <div className="flex-1 ">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
