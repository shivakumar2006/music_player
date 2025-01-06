import { Link } from "react-router-dom";
import PlayPause from './PlayPause'; // Import the PlayPause component
import { useDispatch } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongCard = ({ song, i, activeSong, isPlaying, handlePlay, handlePause }) => {
  const dispatch = useDispatch();

  // Handle play button click for a song
  const handlePlayClick = () => {
    if (activeSong?.title === song?.title) {
      // If this song is already playing, toggle play/pause
      dispatch(playPause(!isPlaying));
    } else {
      // If this song is not the active song, set it as the active song and play it
      dispatch(setActiveSong({ song, data: [], i }));
      dispatch(playPause(true)); // Play the clicked song
    }
  };

  // Handle pause button click
  const handlePauseClick = () => {
    dispatch(playPause(false)); // Pause the song
  };

  // Default song title and artist for missing data
  const songTitle = song.title || song.snippet?.title || "No Title Available";
  const songSubtitle = song.snippet?.channelTitle || song.artist || "No Artist Available";

  // Default song image if missing
  const songImage = song.snippet?.thumbnails?.medium?.url || 'https://via.placeholder.com/250x250';

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer song-card-hover">
      <div className="relative w-full h-56 group">
        {/* Overlay with play/pause button */}
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song?.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying && activeSong?.title === song?.title} // Only show play/pause for the active song
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        {/* Song image */}
        <img 
          alt={songTitle} 
          src={songImage} 
          className="w-full h-full object-cover" 
          onClick={handlePlayClick} // Set this song as active and play it
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
