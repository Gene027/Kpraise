import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Upload } from "@/components";
import { useRouter } from "next/router";
const Navbar = () => {
  const [open, setOpen] = useState(false); //for upload button trigger
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <div className="cursor-pointer">
        <img style={{ width: 80 }} src="logo.svg" alt="Kpraise" onClick={() => router.push("/")} />
      </div>
      <div>
        <div>
          {currentUser ? (
            <button onClick={() => setOpen(true)}>Upload</button>
          ) : (
            <div
              className="mr-3 cursor-pointer"
              onClick={() => router.push("/auth/signin")}
            >
              Login
            </div>
          )}
          {open && <Upload setOpen={setOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
