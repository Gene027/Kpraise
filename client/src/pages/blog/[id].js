import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import axios from "axios";

const BlogDetails = () => {
  const router = useRouter();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    if (router.isReady) {
      const { id: blogid } = router.query;
      const fetchBlog = async () => {
        const res = await axios
          .get(process.env.API + `/blog/find/${blogid}`)
          .catch((err) => console.log(err));
        setBlog(res?.data);
      };
      fetchBlog();
    }
  }, [router.isReady]);

  return (
    <>
      <div className="flex flex-col items-center px-5 mt-10">
        <div className="flex flex-col gap-3 items-center pb-5">
          <h1 className="font-semibold text-2xl lg:text-4xl text-center">
            {blog?.title}
          </h1>
          <h3 className="font-medium text-purple-900 text-lg uppercase">
            {blog?.category}
          </h3>
        </div>

        {blog?.videoUrl ? (
          <div>
            <video src={blog.videoUrl} controls></video>
          </div>
        ) : (
          <div>
            <img
              src={blog?.imgUrl}
              alt="Blog Cover art"
              className="aspect-square max-w-md"
            />
          </div>
        )}

        <div className="flex items-center justify-between lg:justify-center gap-10 mt-5 w-full">
          <p className="font-medium">Posted: {format(blog?.createdAt)}</p>

          <div className="flex gap-2 items-center">
            Share:
            <FacebookShareButton
              url={"https://www.vitagreennigeria.com"}
              quote={"Check out this post!"}
              hashtag="#kpraise"
            >
              <FacebookIcon size={30} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={"https://www.vitagreennigeria.com"}
              quote={"Check out this post!"}
              hashtag="#kpraise"
            >
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={"https://www.vitagreennigeria.com"}
              quote={"Check out this post!"}
              hashtag="#kpraise"
            >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
          </div>
        </div>

        <div className="px-5 lg:px-40 mt-5">
          <p className="text-justify">{blog?.content}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
