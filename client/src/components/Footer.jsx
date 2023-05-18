import React from "react";
import { WhatsappIcon, TwitterIcon, FacebookIcon } from "react-share";
import { BiArrowToTop } from "react-icons/bi";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="absolute bottom-0 w-full bg-black3 flex justify-between py-2">
      <div></div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="flex gap-3 w-full">
          <div className="flex flex-1 justify-center gap-3 mt-1">
            <a href="">
              <WhatsappIcon size={30} round />
            </a>
            <a href="">
              <TwitterIcon size={30} round />
            </a>
            <a href="">
              <FacebookIcon size={30} round />
            </a>
          </div>
        </div>

        <div className="text-white flex gap-5">
          <p>
            Copyright {year} ©{" "}
            <a
              href="https://www.linkedin.com/in/praise-anosike-a6a402230"
              className="font-medium"
            >
              Praisewebster
            </a>{" "}
            inc. All rights reserved
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex justify-center items-center text-slate-300 mr-5 rounded-full border hover:bg-yellow-600 h-10 w-10">
          <a href="#top">
            <BiArrowToTop className="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
