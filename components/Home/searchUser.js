import React, { useEffect, useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  followUser,
  getSearchUsers,
  setSearchBar,
} from "../../redux/services/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { reset, searchUseraa, setUsersEmpty } from "../../redux/services/user";
import Image from "next/image";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";

function SearchUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { searchUsers, isError, message } = useSelector((state) => state.user);
  const onsubmitHandler = (e) => {
    e.preventDefault();
    router.push(`/`);
  };
  useEffect(() => {
    if (isError) toast.error(message);
    if (searchValue) dispatch(searchUseraa(searchValue));
    if (!searchValue) {
      dispatch(setUsersEmpty());
    }
    dispatch(reset());
  }, [searchValue, dispatch, isError, message]);
  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="fixed top-0 left-0 h sm:max-w-xs  sm:max-h-[80vh] sm:min-h-fit  w-full z-50 clay p-3 bg-white ">
      <div className="flex neuphor md:px-2 items-center ">
        <div>
          <XIcon
            onClick={() => {
              dispatch(setSearchBar(false)), dispatch(setUsersEmpty());
            }}
            className="h-7 w-7 cursor-pointer"
          />
        </div>
        <form
          onSubmit={(e) => onsubmitHandler(e)}
          className="w-full  flex items-center rounded-3xl border-2 px-2 "
        >
          <DebounceInput
            debounceTimeout={700}
            minLength={1}
            value={searchValue}
            // ref={(input) => input && input.focus()}
            onChange={onChangeHandler}
            className="h-10 w-full rounded-3xl border-none outline-none px-2"
            type="text"
            autoFocus
          />
          <button onClick={(e) => onsubmitHandler(e)} type="submit">
            <SearchIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </form>
      </div>
      <div>
        {searchValue.length > 0 ? (
          searchUsers?.slice(0, 8).map((user) => {
            return (
              <Link href={`${user._id}`}>
                <div
                  onClick={() => dispatch(setSearchBar(false))}
                  key={user._id}
                  className="p-1 flex cursor-pointer items-center"
                >
                  <span className=" rounded-full border-2 ">
                    <Image
                      className="rounded-full  "
                      src={"/profile.jpg"}
                      height={"30px"}
                      width={"30px"}
                      objectFit="contain"
                    />
                  </span>
                  <span className="text-sm ml-6 text-gray-700 font-medium ">
                    {user.username}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className={`text-center  font-semibold `}>Search anyone</h1>
        )}
        {searchUsers?.length === 0 ? (
          <h1
            className={`text-center ${
              searchValue.length === 0 && "hidden"
            } font-semibold `}
          >
            No users found
          </h1>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchUser;
