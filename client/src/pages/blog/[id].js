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
      <div>
        <div>
          <h1>{blog?.title}</h1>
        </div>
        <div>
          <h3>{blog?.category}</h3>
        </div>

        {blog?.videoUrl ? (
          <div>
            <video src={blog.videoUrl} controls></video>
          </div>
        ) : (
          <div>
            <img src={blog?.imgUrl} alt="Blog Cover art" />
          </div>
        )}
        <div className="flex gap-2">
          <p className="mt-3 font-medium">{format(blog?.createdAt)}</p>
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
        <div>{blog?.content}</div>
      </div>
    </>
  );
};

export default BlogDetails;
