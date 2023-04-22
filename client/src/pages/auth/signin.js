import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";

const SignIn = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8800/api/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      router.push('/');
    } catch (err) {
      dispatch(loginFailure()); //you can pass in err to this dispatch fn and accept as action in userSlice.js 
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="flex items-center flex-col my-5 border-2 border-solid border-gray-500 px-12 py-5 gap-3 justify-center rounded-lg">
          <h1 className="font-lato font-bold text-[24px]">Sign in</h1>
          <div className="text-[#757575] text-[20px] font-light">We are pleased to have you back sir</div>

          <input
            className=" border-2 border-solid border-gray-400 rounded-sm p-3 bg-transparent w-full text-[#757575]"
            type="text"
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
          />

          <input className=" border-2 border-solid border-gray-400 rounded-sm p-3 bg-transparent w-full text-[#757575]"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="rounded-sm border-none py-3 px-5 font-bold cursor-pointer bg-yellow-500 text-white" onClick={handleLogin}>Sign in</button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
