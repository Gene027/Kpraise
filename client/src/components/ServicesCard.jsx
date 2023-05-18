import { useRouter } from "next/router";
import React from "react";

const servicesCard = ({ service }) => {
  const router = useRouter();
  return (
    <div className="w-full md:w-[45%] flex flex-col shadow-lg bg-white p-2">
      <img
        src={service.image}
        alt="service image"
        className="bg-slate-200 max-h-[340px] aspect-square"
      />

      <div className="px-2 pb-3">
        <div className="bg-black h-[60px] w-[60px] flex justify-center items-center ml-5 mt-[-40px]">
          {service.icon()}
        </div>
        <div className="pl-5 pt-5">
          <h3 className="font-medium text-2xl">{service.title}</h3>
          <p className="text-gray-800 mt-2">{service.desc}</p>
          <button
            className="mt-5 bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 border border-yellow-700-700 rounded-lg w-[150px] border-none cursor-pointer
          "
            onClick={() => router.push("/contact")}
          >
            Contact Us &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default servicesCard;
