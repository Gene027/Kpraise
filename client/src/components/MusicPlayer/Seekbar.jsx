import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="flex flex-row items-center">
      <button type="button" onClick={() => setSeekTime(appTime - 5)} className="mr-1">
        -
      </button>
      <p className="text-black">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-2 2xl:mx-6 rounded-lg"
      />
      <p className="text-black">{max === 0 ? '0:00' : getTime(max)}</p>
      <button type="button" onClick={() => setSeekTime(appTime + 5)} className="ml-1 text-black">
        +
      </button>
    </div>
  );
};

export default Seekbar;
