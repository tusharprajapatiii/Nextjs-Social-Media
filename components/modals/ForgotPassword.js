import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, reset } from "../../redux/services/auth";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import useOutsideAlerter from "../componentVisible";
import { useRef } from "react";
function ForgotPassword({ setForgotPass }) {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) toast.success(message);
    dispatch(reset());
  }, [message, isError, isSuccess, dispatch]);
  const submit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setForgotPass);

  return (
    <div className="h-screen absolute top-0 w-screen flex items-center justify-center it z-50  ">
      <div
        ref={wrapperRef}
        className="relative w-full  bg-white border-2 shadow-sm rounded-md py-4  px-2 max-w-xl "
      >
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form
          className="my-8 flex flex-col justify-between "
          onSubmit={(e) => submit(e)}
        >
          <input
            placeholder="email"
            className="h-12 border-2 shadow-md rounded-lg px-4 outline-none w-full"
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={() => setForgotPass(false)}
          className="absolute cursor-pointer top-3 right-5 "
        >
          <XIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
