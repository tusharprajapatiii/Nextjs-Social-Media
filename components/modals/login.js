import React, { useState } from "react";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login, register, reset } from "../../redux/services/auth";
function LoginModal({ setShowLogin, setForgotPass }) {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setUser({
      ...User,
      [e.target.name]: e.target.value,
    });
  };
  //   function googleLogin() {
  //     const provider = new GoogleAuthProvider();
  //     return signInWithPopup(auth, provider);
  //   }
  const dispatch = useDispatch();
  const { user, token, message, isError, isLoading } = useSelector(
    (state) => state.auth
  );
  React.useEffect(() => {
    if (isError) {
      toast.error(message, {
        toastId: "login",
      });
    }
    if (token) {
      router.push("/");
    }
    dispatch(reset());
  }, [token, isError, isError, message, dispatch]);

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login(User));
  };
  return (
    <div
      className={`absolute p-3 bg-white border-2 md:clay overflow-y-auto rounded-lg w-full h-full md:w-[70%]  md:h-[65%] xl:h-[90%] md:left-[20%] md:top-8 top-0 left-0 `}
    >
      <div className="flex">
        <span
          onClick={() => setShowLogin(false)}
          className="w-40 cursor-pointer basis-[45%]"
        >
          <XIcon className="h-6 w-6" />
        </span>
        <span className="text-3xl clay text-red-700 text-center font-extrabold">
          <Image
            className="rounded-full"
            src="/images.png"
            height={40}
            width={45}
          />
        </span>
        <span className="basis[45%]"></span>
      </div>

      <div className="mb-10 mt-20 xl:mt-6 px-4 flex flex-col justify-between ">
        <button
          //   onClick={() => {
          //     googleLogin()
          //       .then((user) => {
          //         console.log(user);
          //         if (user.user.emailVerified) {
          //           router.push("/home");
          //         } else {
          //           alert("Please verify your email");
          //         }
          //       })
          //       .catch((err) => console.log(err));
          //   }}
          className="my-8 clay flex md:w-[53%] w-full border-2 rounded-3xl py-2 mx-auto  justify-center"
        >
          <Image src="/google.jpg" height={22} width={22} />
          <span className="ml-6">Sign In with Google</span>
        </button>
        <form
          autoComplete="off"
          autoSave="off"
          onSubmit={(e) => loginUser(e)}
          action=""
          className="space-y-4  flex flex-col items-center "
        >
          <div className="relative w-full md:w-[65%] rounded-lg clay px-3 border-2">
            {/* <label
              className={` absolute my-1 text-xl ${user.email && "text-xs"}`}
              htmlFor="email"
            >
              email
            </label> */}
            <input
              className="py-1 bg-slate-50  w-full border-none outline-none rounded-lg my-1 h-8"
              placeholder="Email"
              type="email"
              name="email"
              value={User.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative w-full md:w-[65%] rounded-lg clay px-3 border-2">
            {/* <label
              className={` absolute my-1 text-xl ${user.password && "text-xs"}`}
              htmlFor="password"
            >
              password
            </label> */}
            <input
              className="py-1 bg-slate-50  w-full border-none outline-none rounded-lg my-1 h-8"
              type="password"
              placeholder="password"
              name="password"
              value={User.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <button
            className={`my-3 border-2 rounded-lg px-4 py-2 ${
              isLoading && "opacity-20"
            } bg-cyan-600  `}
            type="submit"
          >
            submit
          </button>
        </form>
        <div className="flex flex-col  items-center">
          <button
            onClick={() => {
              setForgotPass(true), setShowLogin(false);
            }}
            className="my-2 clay rounded-lg px-8 py-2  border-2"
          >
            forgot password
          </button>
          <p className="text-left">new user? Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
