import React, { useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const MobileMenu = ({handleLogout, currentUser}) => {
  const router = useRouter();
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  return (
    <>
      {mobileMenuOpen ? (
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
      ) : (
        <HiOutlineMenu
          className="w-6 h-6 text-white"
          onClick={() => setmobileMenuOpen(true)}
        />
      )}
    </>
  );
};

export default MobileMenu;
