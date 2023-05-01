import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const res = axios
      .get("http://localhost:8800/api/auth", { withCredentials: true })
      .catch((error) => {
        console.log("Continuing as Guest");
      });
    if (res.status === 200) {
      //set redox user if current session is still on
      dispatch(loginSuccess(res.data));
      router.push("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/signin",
        { email, password },
        { withCredentials: true }
      ); //withCredentials = true to allow data access control for cookies
      dispatch(loginSuccess(res.data));
      router.push("/");
    } catch (error) {
      dispatch(loginFailure()); //you can pass in err to this dispatch fn and accept as action in userSlice.js
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="flex items-center flex-col my-5 border-2 border-solid border-gray-500 px-12 py-5 gap-3 justify-center rounded-lg">
          <h1 className="font-lato font-bold text-[24px]">Sign in</h1>
          <div className="text-[#757575] text-[20px] font-light">
            We are pleased to have you back
          </div>

          <form onSubmit={handleLogin} className="flex items-center flex-col px-12 py-5 gap-3 justify-center rounded-lg">
            <input
              className=" border-2 border-solid border-gray-400 rounded-sm p-3 bg-transparent w-full text-[#757575]"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className=" border-2 border-solid border-gray-400 rounded-sm p-3 bg-transparent w-full text-[#757575]"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-sm border-none py-3 px-5 font-bold cursor-pointer bg-yellow-500 text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
