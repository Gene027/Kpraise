import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  logout,
  loginStart,
  loginFailure,
} from "../redux/userSlice";
import { Upload } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false); //for upload button trigger
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const update = async () => {
      const res = await axios
        .get("http://localhost:8800/api/auth", { withCredentials: true })
        .catch((error) => {
          console.log("Continuing as Guest");
        });

      if (res?.status === 200) {
        //set redox user if current session is still on
        dispatch(loginSuccess(res.data));
        console.log("Restored session");
      }
    };
    update();
  }, []);

  const handleLogout = async (e) => {
    dispatch(loginStart());
    try {
      const res = await axios.get("http://localhost:8800/api/auth/signout", {
        withCredentials: true,
      }); //withCredentials = true to allow data access control for cookies
      dispatch(logout());
      console.log(res.data);
      router.push("/");
    } catch (err) {
      dispatch(loginFailure()); //you can pass in err to this dispatch fn and accept as action in userSlice.js
      alert("logoutFailure");
    }
  };

  return (
    <div className="flex justify-between bg-black3 items-center shadow-3xl drop-shadow-3xl border border-solid border-black sticky top-0 left-0 w-full">
      <div>
        <img
          className="object-fill md:h-20 md:w-28 h-16 w-20 cursor-pointer"
          src="/logo.svg"
          alt="Kpraise"
          onClick={() => router.push("/")}
        />
      </div>
      {/* Mobile Devices */}
      <div className="mr-5 flex gap-5">
        {mobileMenuOpen && (
          <div className="absolute top-0 right-0 w-full h-[100vh] flex z-40">
            <div className="bg-slate-100/95 w-[70%] flex flex-col text-gray-700 uppercase text-sm font-medium pt-12 gap-1">
              <div
                className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                  router.pathname == "/services" && "bg-black/5"
                }`}
                onClick={()=> {
                  setmobileMenuOpen(false);
                  router.push('/services')
                }}
              >
                Services
              </div>
              <div
                className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                  router.pathname == "/about" && "bg-black/5"
                }`}
                onClick={()=> {
                  setmobileMenuOpen(false);
                  router.push('/about')
                }}
              >
                About
              </div>
              <div
                className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                  router.pathname == "/contact" && "bg-black/5"
                }`}
                onClick={()=> {
                  setmobileMenuOpen(false);
                  router.push('/contact')
                }}
              >
                Contact
              </div>
            </div>
            <div
              className="bg-black/50 relative p-5 flex-1"
              onClick={() => setmobileMenuOpen(false)}
            >
              <RiCloseLine
                className="w-8 h-8 text-slate-200 absolute top-2 right-2"
                onClick={() => setmobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
        <div className="hidden md:flex items-center gap-5 text-white">
          <Link
            href="/services"
            className={`hover:text-yellow-500 cursor-pointer ${
              router.pathname == "/services" && "text-yellow-500"
            }`}
          >
            Services
          </Link>
          <Link
            href="/about"
            className={`hover:text-yellow-500 cursor-pointer ${
              router.pathname == "/about" && "text-yellow-500"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-yellow-500 cursor-pointer ${
              router.pathname == "/contact" && "text-yellow-500"
            }`}
          >
            Contact
          </Link>
        </div>
        <div>
          {currentUser ? (
            <div className="flex gap-2 font-semibold text-lg">
              <button
                className="cursor-pointer font-semibold text-white text-lg"
                onClick={() => setOpen(true)}
              >
                Upload
              </button>
              <button
                className="ml-2 cursor-pointer font-semibold text-white text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className="hidden cursor-pointer">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div className="hidden">
                <button
                  className="mr-3 bg-white hover:bg-blue-500 text-black3 font-semibold hover:text-white py-2 px-4 border border-black3 hover:border-transparent rounded"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </button>
                <button
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          {open && <Upload setOpen={setOpen} />}
        </div>
        <div className="flex md:hidden items-center">
          {!mobileMenuOpen && (
            <HiOutlineMenu
              className="w-6 h-6 text-white"
              onClick={() => setmobileMenuOpen(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
