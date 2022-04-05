import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import SignStep from "./SignStep";
import PersonalDetailsModal from "./PersonalDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/services/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
function SignupModal({ setShowEmail, showEmail }) {
  const [step, setStep] = React.useState(0);
  const [avatarPreview, setAvatarPreview] = React.useState("/profile.jpg");
  const [avatar, setAvatar] = React.useState("");
  const dispatch = useDispatch();
  const [User, setUser] = React.useState({
    fullname: "",
    email: "",
    password: "",
    avatar: avatar,
    username: "",
    gender: "",
    goal: "",
    mobile: "",
    birthdate: "",
  });

  const onChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      {
        e.target.files[0] && reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({
        ...User,
        [e.target.name]: e.target.value,
      });
    }
  };
  const { token, message, isError, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();
  useEffect(() => {
    if (isError) toast.error(message);
    if (user) router.push("/");
    dispatch(reset());
  }, [isError, message, token, dispatch, router]);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(register(User));
  };
  return (
    <div className="absolute  overflow-y-auto p-3 clay top-0 left-0 h-screen z-10 md:w-[70%] md:left-[15%] md:h-[60%] md:top-[15%] md:p-2 xl:h-[80%] xl:top-[8%] bg-white w-full">
      <div className="flex">
        <span
          onClick={() => setShowEmail(false)}
          className="w-40 cursor-pointer basis-[45%]"
        >
          <XIcon className="h-6 w-6" />
        </span>
        <span className="text-3xl  text-red-700 text-center font-extrabold">
          <Image
            className="rounded-full clay"
            src="/images.png"
            height={40}
            width={45}
          />
        </span>
        <span className="basis[45%]"></span>
      </div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <div className="flex flex-col items-center">
          {step === 0 && (
            <SignStep
              title="SignUp Details"
              fullname={User.fullname}
              email={User.email}
              password={User.password}
              onChangeHandler={onChangeHandler}
            />
          )}
          {step === 1 && (
            <PersonalDetailsModal
              title="Personal details"
              avatar={User.avatar}
              username={User.username}
              gender={User.gender}
              goal={User.goal}
              birthdate={User.birthdate}
              onChangeHandler={onChangeHandler}
              avatarPreview={avatarPreview}
              onSubmitHandler={onSubmitHandler}
            />
          )}
        </div>
        <div className="flex justify-center space-x-16">
          <button
            className="clay p-4"
            disabled={step === 0}
            onClick={() => {
              setStep((step) => step - 1);
            }}
          >
            prev
          </button>
          <button
            type="submit"
            className={`my-3 border-2 rounded-lg px-4 py-2 ${
              isLoading && "opacity-20"
            } bg-cyan-600  `}
            onClick={() => {
              if (step < 1) {
                setStep((step) => step + 1);
              }
            }}
          >
            {step === 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupModal;
