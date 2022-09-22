import React from "react";
import {
  CakeIcon,
  InboxIcon,
  DeviceMobileIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

function InfoBadge({ user }) {
  return (
    <div className="p-3 xl:sticky xl:top-16 relative border-2 shadow-md bg-white max-h-[400px] md:border-2 shadow-md rounded-lg max-w-lg xl:mx-2 xl:min-w-[400px] mx-auto mt-4">
      <h1 className="text-xl text-center font-bold "> Info</h1>
      <div>
        <div className="flex py-1 pl-4 ">
          <CakeIcon className="h-6 w-6" />
          <h4 className="pl-8">{user.birthdate?.substring(0, 10)}</h4>
        </div>
        <div className="flex  py-1 pl-4">
          <InboxIcon className="h-6 w-6" />
          <h4 className="pl-8">{user.email}</h4>
        </div>
        {user.mobile && (
          <div className="flex  py-1 pl-4">
            <DeviceMobileIcon className="h-6 w-6" />
            <h4 className="pl-8">{user.mobile}</h4>
          </div>
        )}
        {user.links && (
          <div className="flex  py-1 pl-4">
            <LinkIcon className="h-6 w-6" />
            <div className="flex flex-col ml-8">
              {user.links.map((link, index) => (
                <a href={link} key={index}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="top-3 absolute right-6 cursor-pointer">
        <Link href={"/editProfile"}>
          <PencilIcon className=" h-6 w-6 " />
        </Link>
      </div>
    </div>
  );
}

export default InfoBadge;
