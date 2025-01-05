import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from './PlayPause';
import { setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, activeSong, isPlaying, data }) => {
  console.log("Full song object: ", song);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(PlayPause(flase));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(PlayPause(true));
  };

  // const songTitle = song.snippet?.title || "No Title Available";
  // const songSubtitle = song.snippet?.channelTitle || "No Artist Available";
  const songTitle = song.title || song.snippet?.title || "No Title Available";
  const songSubtitle = song.snippet?.channelTitle || song.artist || "No Artist Available";


  const songImage = song.snippet?.thumbnails?.medium?.url || 'https://via.placeholder.com/250x250';

  const handleSetActiveSong = () => {
    setActiveSong(song);
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer song-card-hover">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song?.snippet?.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
        </div>
        <img 
          alt={songTitle} 
          src={songImage} 
          className="w-full h-full object-cover" 
          onClick={handleSetActiveSong}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {songTitle}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artist'}>
            {songSubtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
