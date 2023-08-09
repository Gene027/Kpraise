import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ResultCard = ({ song, i, isPlaying, activeSong, songs }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  return (
    <Link href={`/songs/${song._id}`}>
      <div className="flex flex-col sm:w-[250px] w-[180px] shadow-xl hover:shadow-lg backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div>
          <div className="sm:min-h-[250px] min-h-[180px] rounded-lg bg-gray-300">
            <img alt="song_img" src={song.imgUrl} className="rounded-lg" />
          </div>
        </div>
        <div className="mt-2 flex flex-col text-center p-2">
          <p className="font-semibold text-lg leading-5">
            <Link href={`/songs/${song._id}`}>{song.title}</Link>
          </p>
          <p className="text-sm truncate mt-1">{song.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
