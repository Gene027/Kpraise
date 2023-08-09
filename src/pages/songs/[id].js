import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../../redux/features/playerSlice";
import { Error, Loader, RelatedSongs } from "../../components";
import {
  useGetSongByIdQuery,
  useGetArtistByIdQuery,
  useGetArtistSongsQuery,
} from "../../redux/services/api";
import { fetchSuccess } from "@/redux/songSlice";
import { format } from "timeago.js";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { FaDownload, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PlayPause from "@/components/PlayPause";

const SongDetails = () => {
  //social share, download song, show artist songs, increase views
  const dispatch = useDispatch();
  const router = useRouter();
  const { id: songid } = router.query;
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //isFetching: isFetchingSong  is simply renaming the destructured isFetching to isFetchingSong
  const {
    data,
    isFetching: isFetchingSong,
    error,
    isSuccess,
  } = useGetSongByIdQuery(songid);
  const userId = data?.userId;
  const {
    data: artist,
    isFetching: isFetchingArtist,
    error: artistFetchError,
    isSuccess: artistFetchSuccess,
  } = useGetArtistByIdQuery(userId, { skip: !isSuccess });
  const {
    data: artistSongs,
    isFetching: isFetchingArtistSongs,
    error: artistSongFetchError,
    isSuccess: artistSongFetchSuccess,
  } = useGetArtistSongsQuery(userId, { skip: !isSuccess });

  dispatch(fetchSuccess(data));

  const handleDownload = () => {
    const url = data?.audioUrl;
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = `${data?.title}.mp3`
    aTag.target = '_blank';
    aTag.rel = 'noopener noreferrer';
    aTag.click();
  };
  
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songs: artistSongs, i }));
    dispatch(playPause(true));
  };

  const { currentSong } = useSelector((state) => state.song);

  return (
    <>
      {isFetchingSong ||
        (isFetchingArtist && <Loader title="Loading song details..." />)}
      {error && <Error message={"Error loading song details... Try again"} />}
      {artistFetchError && (
        <Error message={"Error loading Artist... Try again"} />
      )}
      {artistFetchSuccess && artistSongFetchSuccess && (
        <div className="flex gap-10 flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:px-5">
          <div className="max-w-md md:max-w-2xl lg:max-w-lg mt-3">
            <div className="flex flex-col relative group p-3 cursor-pointer">
              <img
                src={currentSong?.imgUrl}
                alt="Selected Song"
                className="shadow-md object-fill"
              />
              <div
                className={`absolute inset-3 flex justify-center items-center bg-black bg-opacity-40 ${
                  activeSong?.title === data.title && "bg-black bg-opacity-70"
                }`}
              >
                <PlayPause
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={data}
                  handlePause={handlePauseClick}
                  handlePlay={() => handlePlayClick(currentSong, 0)}
                />
              </div>
            </div>
            <div className="pl-3 pr-3">
              <h1 className="text-xl font-medium mt-5">{currentSong?.title}</h1>
              <div className="flex items-center justify-between">
                <span className="tracking-wide">
                  {currentSong?.views} views • {format(currentSong?.createdAt)}
                </span>
              </div>
              <div className="flex gap-3 items-center mt-4">
                <div>
                  {artist?.img ? (
                    <img src={artist.img} alt="Artist Image" className="bg-gray-200 rounded-full w-10 h-10"/>
                  ) : (
                    <img src="/mr-kpraise.jpg" alt="Artist Image" className="bg-gray-500 rounded-full w-10 h-10"/>
                  )}
                </div>
                <h3 className="text-base font-normal">{artist?.name}</h3>
              </div>
              <div className="mt-4 flex justify-between flex-wrap">
                <div className="rounded-md shadow-sm hidden" role="group">
                  <button className="inline-flex items-center px-4 py-2 bg-slate-200 rounded-l-2xl hover:bg-gray-500">
                    <FaThumbsUp/>
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-slate-200 rounded-r-2xl hover:bg-gray-500">
                    <FaThumbsDown/>
                  </button>
                </div>
                <div className="flex gap-2 items-center font-medium">
                  Share:
                  <FacebookShareButton
                    url={"https://www.vitagreennigeria.com"}
                    quote={"Check out this site!"}
                    hashtag="#kpraise"
                  >
                    <FacebookIcon size={30} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={"https://www.vitagreennigeria.com"}
                    quote={"Check out this site!"}
                    hashtag="#kpraise"
                  >
                    <WhatsappIcon size={30} round />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={"https://www.vitagreennigeria.com"}
                    quote={"Check out this site!"}
                    hashtag="#kpraise"
                  >
                    <TwitterIcon size={30} round />
                  </TwitterShareButton>
                </div>
                <div>
                  <button
                    className="flex  gap-1 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-2xl border-none cursor-pointer"
                    onClick={handleDownload}
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

        {/* Related Songs */}
        <div className="flex-1 lg:flex-1 w-full max-w-md lg:max-w-2xl px-3 pt-5 lg:overflow-y-scroll">
            {isFetchingArtistSongs && <Loader />}
            {artistSongFetchError && (
              <Error message={"Oops... Error loading artist songs"} />
            )}
            {artistSongFetchSuccess && (
              <RelatedSongs
                data={artistSongs}
                artistId={artist}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SongDetails;
