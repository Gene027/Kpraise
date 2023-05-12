import React from "react";
import Navbar from "./Navbar";
import { MusicPlayer, Footer } from "@/components";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { activeSong } = useSelector((state) => state.player);

  return (
     //bottom padding @ main equals footer height
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pb-10">
        {children}
        {activeSong?.title && (
          <div className="sticky bottom-0 left-0 animate-slideup z-10 flex justify-center w-full">
            <MusicPlayer />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
