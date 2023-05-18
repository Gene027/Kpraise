import React from "react";
import { RiFolderMusicLine } from "react-icons/ri";
import { SiCrowdsource } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";

const about = () => {
  return (
    <>
      <div className="lg:flex-row lg:gap-8 lg:justify-center lg:mt-10 flex flex-col gap-3">
        <div className="max-w-sm shadow-md p-8 lg:mb-[-50px] bg-slate-50 rounded">
          <h3 className="uppercase font-medium text-gray-600">About Us</h3>
          <h1 className="font-semibold text-gray-800 text-2xl mt-3">
            K-Praise is an artist who has developed to form a team of music
            professionals who specialize in all forms of musical services
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

      <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-repeat-x h-[50vh] lg:h-[70vh] w-full flex items-end pb-5 justify-center overflow-x-scroll">
        <div className="bg-yellow-500 flex lg:gap-16 gap-4 p-3 lg:p-5 rounded">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <RiFolderMusicLine className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Projects</p>
                <h1 className="font-medium text-xl lg:text-3xl">50+</h1>
              </div>
            </div>
            <p className="leading-tight">Songs by K-Praise</p>
          </div>

          <div className="flex flex-col gap-2 border-l border-black pl-2 lg:pl-5">
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <SiCrowdsource className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Fans</p>
                <h1 className="font-medium text-xl lg:text-3xl">12K+</h1>
              </div>
            </div>
            <p className="leading-tight">Total active fans</p>
          </div>

          <div className="flex flex-col gap-2 border-l border-black pl-2 lg:pl-5">
            <div className="flex gap-3">
              <div className="flex justify-center items-center">
                <GrUserExpert className="h-7 w-7" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Experts</p>
                <h1 className="font-medium text-xl lg:text-3xl">20+</h1>
              </div>
            </div>
            <p className="leading-tight">Professional musicians</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-8 bg-violet-100 py-10">
        <div className="max-w-md flex flex-col gap-2 items-center px-2 text-center">
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

        <div className="max-w-md flex flex-col gap-2 items-center px-2 text-center">
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
          <h1 className="text-2xl font-medium">Name Surname</h1>
        </div>
      </div>
    </>
  );
};

export default about;
