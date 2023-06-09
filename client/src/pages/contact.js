import axios from "axios";
import React, { useEffect, useState } from "react";
import { WhatsappIcon, TwitterIcon, FacebookIcon } from "react-share";

const contact = () => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios
      .post(process.env.API + "/contact", formData)
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
    setResponse(res?.message);
  };
  return (
    <>
      <div className="flex justify-center px-2">
        <div className="flex flex-col items-center max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="flex flex-col text-gray-800 mt-10 gap-2">
            <h3 className="uppercase font-black text-center tracking-wide">
              Contact Us
            </h3>
            <h1 className="font-bold text-2xl md:text-4xl text-center tracking-tight">
              Let’s Start Working For You
            </h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim.
            </p>
          </div>

          <div className="bg-purple-900 flex flex-col lg:flex-row lg:gap-5 gap-14 p-5 mt-10 text-slate-200">
            <div className="lg:w-1/2 flex flex-col text-center lg:text-start gap-5">
              <h3 className="text-center">Working Hours</h3>
              <hr />
              <h2 className="font-bold text-xl">Monday To Friday</h2>
              <h2 className="font-bold text-xl">9:00 AM to 8:00 PM</h2>
              <p>House 5, 41 Road Festac Town, Lagos, Nigeria</p>
            </div>
            <div className="lg:w-1/2 flex flex-col text-center lg:text-start gap-5">
              <h3 className="text-center">Contact Us</h3>
              <hr />
              <div className="font-bold text-xl flex justify-center lg:justify-start gap-1">
                Social:
                <button>
                  <WhatsappIcon size={25} round />
                </button>
                <button>
                  <FacebookIcon size={25} round />
                </button>
                <button>
                  <TwitterIcon size={25} round />
                </button>
              </div>

              <h2 className="font-bold text-xl">Tel: +2348045218963</h2>
              <p>Email: kpraisemusic@gmail.com</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-10 w-full px-5 lg:px-0"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="p-3 lg:p-5 border border-gray-500 shadow-inner rounded-sm placeholder:text-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="p-3 lg:p-5 border border-gray-500 shadow-inner rounded-sm placeholder:text-gray-500"
            />
            <textarea
              name="message"
              rows="10"
              placeholder="Message"
              onChange={handleChange}
              required
              className="p-3 lg:p-5 border border-gray-500 shadow-inner rounded-sm placeholder:text-gray-500"
            ></textarea>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-3 bg-yellow-600 hover:bg-yellow-500 text-white text-sm lg:text-base font-bold py-2 px-4 rounded-2xl w-1/3 border-none cursor-pointer
              "
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default contact;
