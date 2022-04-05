import React from "react";

function SignStep({ title, fullname, email, password, onChangeHandler }) {
  return (
    <div className="w-full px-8 xl:w-[50%] ">
      <h1 className="text-center text-3xl my-4 font-bold">{title}</h1>
      <div className="w-full my-12 xl:my-6">
        <div className="space-y-6">
          <div>
            <input
              className="h-12  clay px-2 w-full  border-2 outline-none rounded-lg my-1"
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
              className="h-12 clay px-2 w-full border-2 outline-none rounded-lg my-1"
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
              className="h-12  clay px-2 w-full border-2 outline-none rounded-lg my-1"
              required
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignStep;
