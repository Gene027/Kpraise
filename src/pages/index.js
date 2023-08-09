import React from "react";
import { useSelector } from "react-redux";
import { Card, Loader, Error, ChooseUs, Review } from "@/components";
import { chooseUs, reviews } from "@/assets/constants";
import {
  useGetRandomSongsQuery,
  useGetLatestSongsQuery,
  useGetTrendingSongsQuery,
} from "@/redux/services/api";
import { useRouter } from "next/router";
import Image from "next/image";

const Home = () => {
  const router = useRouter();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: random, isFetching, error } = useGetRandomSongsQuery(); // it returns res, isFetching, error
  const {
    data: latest,
    isFetching: isFetchingLatest,
    error: errorLatest,
  } = useGetLatestSongsQuery();
  const {
    data: trending,
    isFetching: isFetchingTrending,
    error: errorTrending,
  } = useGetTrendingSongsQuery();
  console.log(process.env.API)

  return (
    <>
      <div
        className="bg-[url('/hero.jpg')] bg-cover bg-center bg-repeat-x h-[50vh] lg:h-[70vh] w-full lg:flex lg:justify-between"
      >
        <div className="h-full w-full bg-black/80 flex items-center">
          <div className=" md:ml-28 ml-10 text-white flex flex-col gap-5 max-w-[70%] md:max-w-[50%]">
            <h4 className="uppercase font-medium text-base tracking-[3px]">
              Classical Recording
              <span className="text-yellow-500"> Studio</span>
            </h4>
            <h2
              className="font-vibes font-bold md:text-[56px] text-[32px] md:leading-[64px] md:tracking-[-2px]">
              Best step to Bring your Ideas into <span className="text-yellow-500">Hit Tracks</span>
            </h2>
            <button className="w-[150px] bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/contact")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="hidden lg:flex mr-20 items-center bg-black/80">
          <Image src="/studio-hero.jpg" alt="Studio hero" width={500} height={300} className="max-w-xs aspect-square rounded-lg" />
        </div>
      </div>

      {/* Discover songs */}
      <div className="flex flex-col items-center">
        <h2 className="mt-14 font-vibes font-bold text-3xl text-left">Discover Songs</h2>
        {isFetching && <Loader title="Loading songs..." />}
        {error && <Error />}
        {random && (
          <div className="flex mt-9 flex-wrap justify-center gap-3">
            {random?.map((song, i) => (
              <Card
                key={song._id}
                song={song}
                songs={random}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* why you should choose Kpraise */}
      <div className="flex flex-col items-center">
        <h2 className="mt-14 font-vibes font-bold text-3xl text-center">Why you should choose us?</h2>
        <div className="flex mt-9 flex-wrap justify-center gap-3">
          {chooseUs.map(content => (
            <ChooseUs key={content.title} content={content} />
          ))}
        </div>
      </div>

      {/* Latest Songs */}
      <div className="flex flex-col items-center">
        <h2 className="mt-14 font-vibes font-bold text-3xl text-left">Latest Songs</h2>
        {isFetchingLatest && <Loader title="Loading latest songs..." />}
        {errorLatest && <Error />}
        {latest && (
          <div className="flex mt-9 flex-wrap justify-center gap-3">
            {latest?.map((song, i) => (
              <Card
                key={song._id}
                song={song}
                songs={latest}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trending Songs */}
      <div className="flex flex-col items-center">
        <h2 className="mt-14 font-vibes font-bold text-3xl text-left">Trending Songs</h2>
        {isFetchingTrending && <Loader title="Loading trending songs..." />}
        {errorTrending && <Error />}
        {trending && (
          <div className="flex mt-9 flex-wrap justify-center gap-3">
            {trending?.map((song, i) => (
              <Card
                key={song._id}
                song={song}
                songs={trending}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* our client's kind words */}
      <div className="flex flex-col items-center">
        <h2 className="mt-14 font-vibes font-bold text-3xl text-left">Our client's kind words</h2>
        <div className="flex mt-9 flex-wrap justify-center gap-3">
          {reviews.map((content, i) => (
            <Review key={i} content={content} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
