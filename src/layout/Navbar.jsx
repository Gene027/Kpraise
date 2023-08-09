import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/userSlice";
import { Upload, Searchbar } from "@/components";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MobileMenu } from "@/components";
import { RiUpload2Line } from "react-icons/ri";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [uploadOpen, setUploadOpen] = useState(false); //for upload button trigger
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

        <div className="mr-5 flex gap-5">

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

          {/* Mobile Devices navlinks */}
          <div className="flex md:hidden items-center">
            <MobileMenu handleLogout={handleLogout} currentUser={currentUser}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
