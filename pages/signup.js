import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
// import EmailSignModal from "../components/EmailSignModal";
// import LoginModal from "../components/LoginModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/services/auth";
import dynamic from "next/dynamic";
// import SignupModal from "../components/modals/signupModal";
// import LoginModal from "../components/modals/login";
// import ForgotPassword from "../components/modals/ForgotPassword";
// import ResetPassword from "../components/modals/ResetPassword";
// import { ToastContainer } from "react-toastify";
const SignupModal = dynamic(() => import("../components/modals/signupModal"));
const LoginModal = dynamic(() => import("../components/modals/login"));
const ForgotPassword = dynamic(() =>
  import("../components/modals/ForgotPassword")
);
const ResetPassword = dynamic(() =>
  import("../components/modals/ResetPassword")
);
export default function Sigin() {
  const [showEmail, setShowEmail] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [forgotPass, setForgotPass] = React.useState(false);
  const [resetPass, setResetPass] = React.useState(false);
  const router = useRouter();
  const { resetToken, id } = router.query;
  const dispatch = useDispatch();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const { user, token, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (resetToken && id) {
      setResetPass(true);
    }
  }, [resetToken, id, resetPass]);

  // useEffect(() => {
  //   if (token) router.push("/");
  // }, [token]);

  return (
    <div className="h-screen">
      <Head>
        <title>Reach</title>
        <meta
          name="description"
          content="our platform to express and share your thoughts on any interests"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`flex-col xl:flex xl:flex-row-reverse relative max-h-full min-h-full bg-white text-black `}
      >
        <div
          className={` px-6  w-full ${
            (showEmail || showLogin) && "opacity-30"
          }`}
        >
          {/* <h1 className="text-red-800 font-extrabold text-[3rem]">M</h1> */}
          <Image src="/images.png" height={40} width={45} />
          <h2 className="py-6 text-[2.5rem] font-bold">Trending Now</h2>
          <h3 className="text-xl my-2 font-bold">Join Reach.</h3>
          <button
            // onClick={() => {
            //   googleSignIn()
            //     .then((user) => {
            //       console.log(user);
            //       if (user.user.emailVerified) {
            //         router.push("/home");
            //       } else {
            //         alert("Please verify your email");
            //       }
            //     })
            //     .catch((err) => console.log(err));
            // }}
            className="my-4 flex clay md:w-[40%] w-full border-2 rounded-3xl py-2 justify-center"
          >
            <Image src="/google.jpg" height={22} width={22} />
            <span className="ml-6 font-semibold">Sign up with Google</span>
          </button>
          <button
            onClick={() => setShowEmail(true)}
            className="my-4 flex clay md:w-[40%] w-full border-2 rounded-3xl py-2 justify-center bg-red-600"
          >
            <span className="ml-6 font-semibold ">Sign up with email</span>
          </button>
          <p className="text-xs">
            By signing up you agree to the terms of service and privacy
          </p>
          <p className="text-xs">policy,including cookie use.</p>
          <hr className="mr-56 my-4 font-semibold" />
          <div>
            <h1 className="font-bold">Already a User?</h1>
            <span>
              <button
                onClick={() => setShowLogin(true)}
                className="my-4 clay font-semibold flex md:w-[40%] w-full border-2 rounded-3xl py-2 justify-center bg-red-600"
              >
                Sign in
              </button>
            </span>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url(/community-7.jpg)",
          }}
          className={`flex w-full  xl:h-[100%] items-center md:items-start justify-center ${
            (showEmail || showLogin) && "opacity-10"
          }`}
        >
          <div className="w-full mx-6 md:mt-8 md:mx-12">
            <h1 className="text-red-700 py-8 text-3xl xl:text-[2.4rem] md:font-extrabold font-bold text-shadow text-left">
              REACH
            </h1>
            <h4 className="text-2xl font-bold md:text-3xl md:leading-relaxed">
              Motivate people around the world throughout your journey.
            </h4>
            <h3 className="my-4 font-extrabold text-3xl">
              connect people with stories
            </h3>
          </div>
        </div>
        {showEmail && (
          <SignupModal setShowEmail={setShowEmail} showEmail={showEmail} />
        )}
        {showLogin && (
          <LoginModal
            setForgotPass={setForgotPass}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
          />
        )}
        {forgotPass && <ForgotPassword setForgotPass={setForgotPass} />}
        {resetPass && (
          <ResetPassword
            setResetPass={setResetPass}
            resetToken={resetToken}
            id={id}
          />
        )}
      </main>
      <h4 onClick={() => dispatch(logout())}>Logout</h4>
    </div>
  );
}
