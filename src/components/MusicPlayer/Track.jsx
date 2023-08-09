import React from "react";
import { FaYoutube } from "react-icons/fa";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-end">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } h-16 w-16 mr-4`}
    >
      <img src={activeSong?.imgUrl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate font-bold text-lg">
        {activeSong?.title ? activeSong?.title : "No active Song"}
      </p>
      {activeSong?.videoUrl ? <a href={activeSong.videoUrl} target="_blank">
        <FaYoutube size={40} color="#FF0000"/>
      </a>: "Video coming soon"}
    </div>
  </div>
);

export default Track;
