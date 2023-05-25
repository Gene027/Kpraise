import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/userSlice";
import { Upload, Searchbar } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine, RiUpload2Line } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [uploadOpen, setUploadOpen] = useState(false); //for upload button trigger
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const update = async () => {
      const res = await axios
        .get(process.env.API + "/auth", { withCredentials: true })
        .catch((error) => {
          console.log(error?.response?.data?.message);
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
    setmobileMenuOpen(false);
    try {
      const res = await axios.get(process.env.API + "/auth/signout", {
        withCredentials: true,
      }); //withCredentials = true to allow data access control for cookies
      dispatch(logout()); //set currentUser to null in redux
      console.log(res.data);
      toast.success("Logout successful");
      window.location.reload();
    } catch (err) {
      toast.error("Oops, error signin out, please try again!");
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      {uploadOpen && <Upload setOpen={setUploadOpen} />}
      <div className="flex gap-2 justify-between bg-black3 items-center shadow-3xl drop-shadow-3xl border border-solid border-black sticky top-0 left-0 w-full z-40">
        <div>
          <img
            className="object-fill md:h-20 md:w-28 h-16 w-20 cursor-pointer"
            src="/logo.svg"
            alt="Kpraise"
            onClick={() => router.push("/")}
          />
        </div>

        <Searchbar />

        {/* Mobile Devices navlinks */}
        <div className="mr-5 flex gap-5">
          {mobileMenuOpen && (
            <div className="absolute top-0 right-0 w-full h-[100vh] flex z-40">
              <div className="bg-slate-100/95 w-[70%] flex flex-col text-gray-700 uppercase text-sm font-medium pt-12 gap-1">
                <div
                  className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                    router.pathname == "/services" && "bg-black/5"
                  }`}
                  onClick={() => {
                    setmobileMenuOpen(false);
                    router.push("/services");
                  }}
                >
                  Services
                </div>
                <div
                  className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                    router.pathname == "/about" && "bg-black/5"
                  }`}
                  onClick={() => {
                    setmobileMenuOpen(false);
                    router.push("/about");
                  }}
                >
                  About
                </div>
                <div
                  className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                    router.pathname == "/contact" && "bg-black/5"
                  }`}
                  onClick={() => {
                    setmobileMenuOpen(false);
                    router.push("/contact");
                  }}
                >
                  Contact
                </div>
                <div
                  className={`hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300 ${
                    router.pathname == "/blog" && "bg-black/5"
                  }`}
                  onClick={() => {
                    setmobileMenuOpen(false);
                    router.push("/blog");
                  }}
                >
                  Blog
                </div>
                {currentUser && (
                  <div
                    className="hover:text-gray-900 cursor-pointer p-3 border-solid border-b border-gray-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
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

          {/* Desktop navlinks */}
          <div className="hidden md:flex items-center gap-5 text-white ml-5">
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
            <Link
              href="/blog"
              className={`hover:text-yellow-500 cursor-pointer ${
                router.pathname == "/blog" && "text-yellow-500"
              }`}
            >
              Blog
            </Link>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-5 ml-2 lg:ml-0">
              <button
                className=" hidden lg:block cursor-pointer text-white hover:text-yellow-500"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="cursor-pointer text-white hover:text-yellow-500"
                onClick={() => setUploadOpen(true)}
              >
                <RiUpload2Line size={25} />
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
              </div>
            </div>
          )}

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
    </>
  );
};

export default Navbar;
