import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  
  // Ref for controlling the current song's audio element
  const audioRef = useRef(null);

  // Scroll into view for the component
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Get top charts
  const TopPlaySongs = data?.slice(0, 5);

  // Handle play/pause logic for each song
  const handlePlayClick = (song, i) => {
    // Set active song and start playing it
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));

    // Play the current song
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.src = song?.videoUrl;  // Update the audio source to the selected song's URL
      currentAudio.play().catch((err) => console.error('Error playing the song', err));
    }
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
    // Pause the current active song
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.pause();
    }
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      {/* Top Play Section */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {TopPlaySongs?.map((song, i) => (
            <div
              key={song.videoId || i}
              className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
              onClick={() => handlePlayClick(song, i)} // Play song on click
            >
              <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img className="w-20 h-20 rounded-lg" src={song?.thumbnail} alt={song?.title} />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <Link to={`/songs/${song.videoId}`}>
                    <p className="text-xl font-bold text-white">{song.title}</p>
                  </Link>
                  <Link to={`/artists/${song?.artists?.[0]?.id}`}>
                    <p className="text-base text-gray-300 mt-1">{song.subtitle}</p>
                  </Link>
                </div>
              </div>
              <PlayPause
                isPlaying={isPlaying && activeSong?.videoId === song.videoId} // Check if the current song is active and playing
                activeSong={activeSong}
                song={song}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, i)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists Section */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {TopPlaySongs?.map((song, i) => (
            <SwiperSlide
              key={song.videoId || i}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              {song?.artists && song?.artists[0] ? (
                <Link to={`/artists/${song?.artists[0].id}`}>
                  <img
                    src={song?.thumbnail}
                    alt={song?.title}
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              ) : (
                <div>No Artist Available</div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Audio Element for Playing the Song */}
      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default TopPlay;
