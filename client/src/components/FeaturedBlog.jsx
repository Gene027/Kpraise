import { useRouter } from "next/router";
import React from "react";
import { format } from "timeago.js";

const FeaturedBlog = ( {featuredBlog}) => {
  let router = useRouter();
  return (
    <div className="bg-indigo-200 md:flex-row flex flex-col-reverse p-10 md:justify-between gap-4">
      <div className="flex flex-col items-center md:items-start md:justify-center md:w-1/2">
        <h3 className="uppercase font-medium text ">Featured Post</h3>
        <h1 className="mt-3 font-bold text-center md:text-start text-2xl md:text-4xl">
          {featuredBlog?.title}
        </h1>
        <p className="mt-3 font-medium">Posted: {format(featuredBlog?.createdAt)}</p>
        <p className="mt-3 text-center md:text-start">
          {featuredBlog?.desc}
        </p>
        <button
          className="mt-5 bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 border border-yellow-700-700 rounded-lg w-[150px] border-none cursor-pointer
          "
          onClick={()=> router.push(`/blog/${featuredBlog?._id}`)}
        >
          Read More &gt;
        </button>
      </div>
      <div className="flex justify-center md:justify-end md:w-1/2">
        <img
          src={featuredBlog?.imgUrl}
          alt="Post Image"
          className="object-contain max-w-xs"
        />
      </div>
    </div>
  );
};

export default FeaturedBlog;
