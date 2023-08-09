import { ServicesCard } from "@/components";
import React from "react";
import { services as data } from "@/assets/constants";

const services = () => {
  return (
    <>
      <div className="relative bg-[url('/services-bg.png')] h-[60vh] w-full object-cover">
        <div className="absolute w-full h-full bg-black/60 flex justify-center items-center">
          <div className="text-white font-bold font-vibes text-4xl max-w-xs lg:max-w-lg text-center">
            <h2>
              The Best Music Producion Starts with{" "}
              <span className="text-yellow-500">K Praise Music</span>
            </h2>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-center mt-14 text-3xl text-gray-900 mb-5">Our Best Services</h1>
      <hr />

      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {data.map((service, i) => (
          <ServicesCard key={i} service={service}/>
        ))}
      </div>
    </>
  );
};

export default services;
