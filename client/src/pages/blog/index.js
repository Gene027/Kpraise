import { BlogCard, UploadBlog, FeaturedBlog } from "@/components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Blog = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [open, setOpen] = useState(false);
  const [featuredBlog, setFeaturedBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(undefined);
  //fetch featured
  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await axios
        .get(process.env.API + "/blog/featured")
        .catch((error) => console.log(error));
      setFeaturedBlog(res?.data);
    };
    fetchFeatured();
  }, []);

  //fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios
        .get(process.env.API + `/blog/page/${page}`)
        .catch((error) => console.log(error));
      setBlogs(res?.data?.blogs);
      setTotalPage(res?.data?.totalPages);
    };
    fetchBlogs();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      {open && <UploadBlog setOpen={setOpen} />}
      {featuredBlog?.imgUrl && <FeaturedBlog featuredBlog={featuredBlog} />}
      {currentUser?.admin && (
        <div className="flex justify-center">
          <button
            className="mt-5 bg-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 border border-yellow-700-700 rounded-lg w-[180px] border-none cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Post New Blog &gt;
          </button>
        </div>
      )}

      {/* All blogs */}
      <div className="mt-14 px-5">
        <h1 className="mb-5 flex justify-center md:block font-bold text-gray-900 text-xl md:text-3xl">All Posts</h1>
        <hr />
        <div className="pt-3">
          {blogs?.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
      <hr className="mt-10"/>
      <div className="flex justify-center gap-2 my-10 font-medium">
        <button
          onClick={() => {
            handlePrev;
          }}
        >
          &lt; Prev
        </button>
        <button
          onClick={() => {
            handleNext;
          }}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
};

export default Blog;
