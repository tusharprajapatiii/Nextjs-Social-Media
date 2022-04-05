import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdatePassword from "../components/modals/UpdatePassword";
import { reset, updateUser } from "../redux/services/auth";

function EditProfile() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const initState = {
    fullname: "",
    email: "",
    username: "",
    mobile: "",
    address: "",
    goal: "",
    links: "",
    gender: "",
  };
  const [editData, setEditData] = useState(initState);
  useEffect(() => {
    setEditData(user);
  }, [user]);

  const onChangeHandler = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser(editData));
  };
  const [updatepass, setUpdatepass] = useState(false);
  const { isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) toast.success("profile updated");
    dispatch(reset());
  }, [isError, isSuccess, message]);

  return (
    <div>
      <div className="max-w-3xl relative pb-6 xl:pb-0 bg-white mx-auto">
        <h1 className="text-center font-bold text-xl">Edit Profile</h1>
        <div
          onClick={() => setUpdatepass(true)}
          className="md:absolute text-center mt-4 top-4 cursor-pointer text-sm font-medium text-cyan-500 left-4"
        >
          update password
        </div>
        <div className="my-6 px-3">
          <form
            onSubmit={onSubmitHandler}
            className="max-w-fit font-semibold space-y-8 xl:space-y-4 mx-auto"
          >
            <div>
              <label htmlFor="fullname">fullname</label>

              <input
                value={editData.fullname}
                onChange={onChangeHandler}
                type="text"
                className="outline-none mx-2 clay px-2 border-2"
                name="fullname"
                id="fullname"
              />
            </div>
            <div>
              <label htmlFor="username">username</label>
              <input
                value={editData.username}
                onChange={onChangeHandler}
                // placeholder={user?.username}
                type="text"
                className="outline-none mx-2 clay px-2 border-2"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                value={editData.email}
                onChange={onChangeHandler}
                // placeholder={user?.email}
                type="email"
                className="outline-none mx-2 min-w-[260px] clay px-2 border-2"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="mobile">mobile</label>
              <input
                value={editData.mobile}
                onChange={onChangeHandler}
                // placeholder={user?.mobile}
                type="text"
                className="outline-none mx-2 clay px-2 border-2"
                name="mobile"
                id="mobile"
              />
            </div>
            <div>
              <label htmlFor="address">address</label>
              <textarea
                value={editData.address}
                onChange={onChangeHandler}
                // placeholder={user?.address ? user.address : "...."}
                type="text"
                className="outline-none min-w-[280px] mx-2 clay px-2 border-2"
                name="address"
                id="address"
              />
            </div>
            <div>
              <label htmlFor="goal">goal</label>
              <textarea
                value={editData.goal}
                onChange={onChangeHandler}
                // placeholder={user?.goal ? user.goal : "...."}
                className="outline-none min-w-[300px] max-h-20 mx-2 clay px-2 border-2"
                name="goal"
                id="goal"
              />
            </div>
            <div>
              <label htmlFor="links" links>
                links
              </label>
              <textarea
                value={editData.links}
                onChange={onChangeHandler}
                // placeholder={user?.links}
                type="text"
                className="outline-none overflow-hidden min-w-[300px] mx-2 max-h-20 clay px-2 border-2"
                name="links"
                id="links"
              />
            </div>
            <div className="space-x-6">
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                className="clay"
                id="Male"
                value="M"
                onChange={onChangeHandler}
                name="gender"
              />
              <label htmlFor="Female">Female</label>
              <input
                onChange={onChangeHandler}
                type="radio"
                className="clay"
                id="Female"
                name="gender"
                value="F"
              />
            </div>
            <div className="text-[10px]">
              * Note: You dont have to fill all the fields, just edit any field
              you want to edit and submit
            </div>
            <div className="right-16 flex justify-center md:absolute top-6">
              <button
                className={`bg-cyan-700 ${
                  isLoading && "opacity-25"
                } rounded-xl px-2 py-1`}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {updatepass && <UpdatePassword setUpdatepass={setUpdatepass} />}
    </div>
  );
}

export default EditProfile;
