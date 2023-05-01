import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex gap-2 items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat size={20} color={repeat ? 'red' : 'black'} onClick={() => setRepeat((prev) => !prev)} className=" cursor-pointer" />
    {currentSongs?.length && <MdSkipPrevious size={30} color="black" className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <BsFillPauseFill size={45} color="black" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={45} color="black" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={30} color="black" className="cursor-pointer" onClick={handleNextSong} />}
    <BsShuffle size={20} color={shuffle ? 'red' : 'black'} onClick={() => setShuffle((prev) => !prev)} className="cursor-pointer" />
  </div>
);

export default Controls;
