import React from "react";

import PlayPause from "./PlayPause";
import Link from "next/link";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] group ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-white shadow-md"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base group-hover:text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.imgUrl}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link href={`/songs/${song._id}`}>
          <p className="text-xl font-medium group-hover:text-white truncate">{song?.title}</p>
        </Link>
        <p className="text-base text-gray-700 group-hover:text-white mt-1">
          {artistId?.name}
        </p>
      </div>
    </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
  </div>
);

export default SongBar;
