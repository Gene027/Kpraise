import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {  loginSuccess } from "../../redux/userSlice";
import { toast, Toaster } from "react-hot-toast";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const res = axios
      .get(process.env.API + "/auth", { withCredentials: true })
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
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.API + "/auth/signin",
        { email, password },
        { withCredentials: true }
      ); //withCredentials = true to allow data access control for cookies
      dispatch(loginSuccess(res.data));
      toast.success('Welcome back')
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="flex flex-col">
        <div className="border-b-2 border-b-slate-200 flex justify-center py-5">
          <h1 className="font-medium text-2xl uppercase text-gray-700">
            My Account
          </h1>
        </div>
        <div className="md:flex md:justify-center">
          <div className="flex flex-col my-5 px-3 gap-3 md:items-center md:w-[60%]">
            <h2 className="mb-3 uppercase text-lg font-medium text-gray-700">
              Login
            </h2>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-3 w-full max-w-2xl"
            >
              <div>
                <h3 className="mb-2">Email address *</h3>
                <input
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full placeholder:text-gray-500"
                  type="email"
                  placeholder="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mb-2">Password *</h3>
                <input
                  className="shadow-inner border border-gray-400 rounded-sm p-2 bg-white w-full placeholder:text-gray-500"
                  type="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="md:flex md:justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded-2xl w-1/3"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
