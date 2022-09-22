import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  reset,
  resetPassword,
} from "../../redux/services/auth";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function ResetPassword({ setResetPass, resetToken, id }) {
  const router = useRouter();
  const [resetDetails, setResetDetails] = React.useState({
    password: "",
    passwordConfirm: "",
    resetToken: resetToken,
    id: id,
  });
  const dispatch = useDispatch();
  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );
  const onChange = (e) => {
    setResetDetails({
      ...resetDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      toast.success(message), router.push("/");
    }
    dispatch(reset());
  }, [message, isError, isSuccess, dispatch]);
  const submit = async (e) => {
    e.preventDefault();
    dispatch(resetPassword(resetDetails));
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setResetPass);
  return (
    <div
      ref={wrapperRef}
      className="h-screen absolute top-0 w-screen flex items-center justify-center it z-50  "
    >
      <div className="relative w-full  bg-white border-2 shadow-md rounded-lg py-4  px-2 max-w-xl ">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form
          className="my-8 flex flex-col justify-between "
          onSubmit={(e) => submit(e)}
        >
          <input
            placeholder="password"
            className="h-12 border-2 shadow-md rounded-lg px-4 outline-none w-full"
            type="password"
            value={resetDetails.password}
            name="password"
            onChange={onChange}
          />
          <input
            placeholder="confirm password"
            className="h-12 border-2 shadow-md rounded-lg px-4 mt-4 outline-none w-full"
            type="password"
            value={resetDetails.passwordConfirm}
            name="passwordConfirm"
            onChange={onChange}
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
          onClick={() => setResetPass(false)}
          className="absolute cursor-pointer top-3 right-5 "
        >
          <XIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
