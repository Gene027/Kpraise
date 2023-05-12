import React from 'react';

const Error = ({message}) => (
  <div className="w-full flex justify-center items-center mt-10">
    <h1 className="font-bold text-2xl">{message? message: "Oops,something went wrong. Please try again"}</h1>
  </div>
);

export default Error;
