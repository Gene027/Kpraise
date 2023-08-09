import React from "react";
import {AiFillStar} from 'react-icons/ai'

const Review = ({ content }) => {
  return (
    <div className="max-w-[380px] lg:max-w-[315px] rounded border hover:shadow-lg shadow-md flex flex-col gap-2 p-3 lg:p-5">
      <div className="flex gap-1 items-center">
        <AiFillStar className="text-yellow-500 h-6 w-6"/>
        <AiFillStar className="text-yellow-500 h-6 w-6"/>
        <AiFillStar className="text-yellow-500 h-6 w-6"/>
        <AiFillStar className="text-yellow-500 h-6 w-6"/>
        <AiFillStar className="text-yellow-500 h-6 w-6"/>
        <div>{"(5.0)"}</div>
      </div>

      <div className="px-8">
        <p className="text-center">{content.desc}</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className='bg-gray-400 rounded-full flex justify-center items-center w-12 p-[2px] h-12'>
          <img src={content.img} alt="Client" className="rounded-full aspect-square" />
        </div>
        <h3 className="font-semibold text-lg">{content.name}</h3>
      </div>
    </div>
  );
};

export default Review;
