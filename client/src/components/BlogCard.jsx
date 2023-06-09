import { useRouter } from "next/router";
import React from "react";
import { format } from "timeago.js";
import { FaStar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const BlogCard = ({ blog, currentUser }) => {
  const router = useRouter();
  const handleSetFeatured = async () => {
    const res = await axios
      .put(
        process.env.API + `/blog/featured/${blog._id}`,
        {},
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
    if (res?.status === 200) {
      toast.success("Featured!");
      window.location.reload();
    }
  };

  const handleDeleteBlog = async () => {
    const res = await axios
      .delete(process.env.API + `/blog/${blog._id}`, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        toast.error("Delete blog failed");
      });
    if (res?.status === 200) {
      toast.success("Blog Deleted");
      window.location.reload();
    }
  };
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="mt-10 md:flex-row flex flex-col items-center lg:items-start gap-8">
        <div className="flex justify-center md:justify-start">
          <img
            src={blog?.imgUrl}
            alt="Post Image"
            className="object-contain max-w-xs"
          />
        </div>
        <div className="flex flex-col items-center md:items-start md:justify-center gap-3 max-w-md md:max-w-xl">
          <h3 className="uppercase text-purple-900 font-semibold text-base tracking-wide">
            {blog?.category}
          </h3>
          <h2 className="max-w-xs md:max-w-xl font-bold md:text-3xl text-2xl text-center md:text-start text-gray-900">
            {blog?.title}
          </h2>
          <p className="max-w-xs md:max-w-xl text-center lg:text-start">
            {blog?.desc}
          </p>
          <div className="flex gap-3 mt-3">
            <p className="font-medium">Posted: {format(blog?.createdAt)}</p>
            {currentUser?.admin && (
              <div className="flex items-center gap-2">
                <button onClick={handleSetFeatured}>
                  <FaStar size={25} className="text-yellow-500" />
                </button>
                <button onClick={handleDeleteBlog}>
                  <AiOutlineDelete size={25} />
                </button>
              </div>
            )}
          </div>
          <button
            className="mt-3 bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 border border-yellow-700-700 rounded-lg w-[150px] border-none cursor-pointer
          "
            onClick={() => router.push(`/blog/${blog?._id}`)}
          >
            See Details &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
