import React from "react";
import { RiFolderMusicLine, RiFlashlightLine } from "react-icons/ri";
import { SiCrowdsource } from "react-icons/si";

const about = () => {
  return (
    <>
      <div className="lg:flex-row lg:gap-8 justify-center lg:mt-10 flex gap-3">
        <div className="w-full lg:max-w-sm shadow-md p-8 lg:mb-[-50px] bg-slate-50 rounded">
          <h3 className="uppercase font-bold text-gray-600 text-center lg:text-start">
            About Us
          </h3>
          <h1 className="font-medium text-gray-800 text-xl lg:text-2xl mt-3 text-center lg:text-start">
            K-Praise is a highly talented and passionate music artist who has
            made significant waves in the industry. With our own
            state-of-the-art studio and a dedicated team of professionals, we
            have established themselves as a force to be reckoned with
          </h1>
        </div>
        <div className="lg:max-w-md lg:flex hidden lg:items-center lg:justify-start pb-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            distinctio recusandae unde hic obcaecati nemo sint corporis, dolore
            quo qui quasi, reiciendis illum laudantium explicabo. Omnis quisquam
            distinctio quae eaque!
          </p>
        </div>
      </div>

      <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-repeat-x h-[50vh] lg:h-[70vh] w-full "></div>

      <div className="flex items-end justify-center">
        <div className="bg-[#d18023] flex lg:gap-24 gap-5 p-5 rounded-xl mt-[-30px] font-sans">
          <div className="flex flex-col lg:ml-24 items-center gap-2 text-white">
            <div className="flex gap-3 justify-center items-center">
              <p>Projects</p>
              <RiFolderMusicLine className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl lg:text-3xl">50+</h1>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 border-l lg:pl-24 pl-5 text-white">
            <div className="flex gap-3 justify-center items-center">
              <p>Fans</p>
              <SiCrowdsource className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl lg:text-3xl">12k+</h1>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 border-l lg:pl-24 lg:mr-24 pl-5 text-white">
            <div className="flex gap-3 justify-center items-center">
              <p>Experts</p>
              <RiFlashlightLine className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl lg:text-3xl">20+</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-8 py-10 px-2 mt-12">
        <div className="max-w-md flex flex-col gap-2 items-center p-2 text-center bg-white rounded-md shadow-md">
          <h3 className="uppercase font-medium">Our Mission</h3>
          <h1 className="text-xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam illo
            sequi ipsa odit fugiat aperiam officiis! Nesciunt, earum similique
            minima praesentium deserunt, vero totam, quasi quo veritatis
            consectetur ipsum illo.
          </p>
        </div>

        <div className="max-w-md flex flex-col gap-2 items-center p-2 text-center bg-white rounded-md shadow-md">
          <h3 className="uppercase font-medium">Our Vision</h3>
          <h1 className="text-xl font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam illo
            sequi ipsa odit fugiat aperiam officiis! Nesciunt, earum similique
            minima praesentium deserunt, vero totam, quasi quo veritatis
            consectetur ipsum illo.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-center font-bold text-3xl mt-10">Meet the team</h1>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit
        </p>
        <div className="flex flex-col items-center gap-3">
          <img
            src="/mr-kpraise.jpg"
            alt="Mr K-Praise"
            className="aspect-square max-w-sm md:max-w-lg"
          />
          <h3>CEO and Founder</h3>
          <h1 className="text-2xl font-medium">K-Praise Kaydor</h1>
        </div>
      </div>
    </>
  );
};

export default about;
