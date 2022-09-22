import { UserAddIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { UserIcon } from "@heroicons/react/solid";
function PersonalDetailsModal({
  title,
  goal,
  birthdate,
  username,
  gender,
  onChangeHandler,
  avatarPreview,
  onSubmitHandler,
}) {
  return (
    <div className="w-full px-8 xl:w-[50%] ">
      <h1 className="text-center text-3xl my-4 font-bold">{title}</h1>
      <div className="w-full border-2 shadow-md rounded-lg p-2 my-12 md:my-2">
        <div
          encType="multipart/form-data"
          className="space-y-6 flex flex-col items-center"
        >
          <div className="flex border-2 shadow-sm rounded-md justify-center relative  ">
            <Image
              className="rounded-full "
              height={100}
              width={100}
              objectFit="cover"
              src={avatarPreview}
              alt="profile-pic"
            />
            <input
              className=" w-[60px] h-[80px] hidden"
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={onChangeHandler}
            />
            <label
              className="absolute bottom-0 md:-bottom-[10px] border-2 shadow-sm rounded-md rounded-full bg-white cursor-pointer"
              htmlFor="avatar"
            >
              <UserIcon height={30} width={30} />
            </label>
          </div>
          <div>
            <input
              className="h-12 border-2 shadow-md rounded-lg  px-2 w-full  outline-none rounded-lg"
              required
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex ">
            <input
              className="h-12 border-2 shadow-md rounded-lg px-2 w-[45%] border-2 outline-none rounded-lg"
              required
              type="text"
              name="gender"
              placeholder="M/F/T"
              value={gender}
              onChange={onChangeHandler}
            />
            <input
              className="h-12 outline-none px-2 border-2 shadow-md rounded-lg"
              placeholder="Birthdate"
              type="date"
              required
              name="birthdate"
              value={birthdate}
              onChange={onChangeHandler}
            />
          </div>
          <div className="w-full">
            <input
              className="h-12 border-2 shadow-md rounded-lg px-2 w-full border-2 outline-none "
              placeholder="Goal"
              type="text"
              required
              name="goal"
              value={goal}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        {/* <form className="space-y-6">
          <div>
            <input
              className="h-12  border-2 shadow-sm rounded-md px-2 w-full  border-2 outline-none rounded-lg my-1"
              required
              placeholder="Fullname"
              type="text"
              name="fullname"
              value={fullname}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              className="h-12 border-2 shadow-sm rounded-md px-2 w-full border-2 outline-none rounded-lg my-1"
              required
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              className="h-12  border-2 shadow-sm rounded-md px-2 w-full border-2 outline-none rounded-lg my-1"
              required
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default PersonalDetailsModal;
