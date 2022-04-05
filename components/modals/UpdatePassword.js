import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updatePassword } from "../../redux/services/userSlice";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
function UpdatePassword({ setUpdatepass }) {
  const [password, setPassword] = React.useState("");
  const [newpassword, setnewpassword] = React.useState("");
  const dispatch = useDispatch();
  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) toast.success(message);
    dispatch(reset());
  }, [isError, isSuccess, message]);
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(updatePassword({ password, newpassword }));
  };
  return (
    <div className="h-screen absolute top-0 w-screen flex items-center justify-center it z-50  ">
      <div className="relative w-full  bg-white clay py-4  px-2 max-w-xl ">
        <h1 className="text-2xl font-bold text-center">Update Password</h1>
        <form
          className="my-8 flex flex-col justify-between "
          onSubmit={onsubmitHandler}
        >
          <input
            placeholder="password"
            className="h-12 clay px-4 outline-none w-full"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="new password"
            className="h-12 clay px-4 outline-none w-full"
            type="password"
            value={newpassword}
            name="newpassword"
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <button
            className={`rounded-2xl bg-cyan-600 my-4 text-slate-50 mx-auto border-2 ${
              isLoading && "opacity-20"
            } px-3 py-1`}
            type="submit "
          >
            Submit
          </button>
        </form>
        <div
          onClick={() => setUpdatepass(false)}
          className="absolute cursor-pointer top-3 right-5 "
        >
          <XIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
