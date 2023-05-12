import React from "react";
import { useSelector } from "react-redux";
import { Card, Loader, Error } from "@/components";
import { useGetRandomSongsQuery } from "@/redux/services/api";

const Home = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetRandomSongsQuery(); // it returns res, isFetching, error

  return (
    <>
      <div className="bg-[url('/hero.jpg')] bg-cover bg-center bg-repeat-x h-[70vh] w-full">
        <div className="h-full w-full bg-black/80 flex items-center">
            <div className=" md:ml-28 ml-10 text-white flex flex-col gap-5 max-w-[70%] md:max-w-[50%]">
              <h4 className="uppercase font-medium text-base tracking-[3px]">
                Classical Recording
                <span className="text-yellow-500"> Studio</span>
              </h4>
              <h2 className="font-sans font-bold md:text-[56px] text-[32px] md:leading-[64px] md:tracking-[-2px]">
                Best step to Bring your Ideas into Hit Tracks
              </h2>
              <button className="w-[150px] bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </div>

        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="mt-5 font-bold text-3xl text-left">Discover</h2>
        {isFetching && <Loader title="Loading songs..." />}
        {error && <Error />}
        {data && (
          <div className="flex mt-5 flex-wrap justify-center gap-3">
            {data?.map((song, i) => (
              <Card
                key={song._id}
                song={song}
                songs={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
