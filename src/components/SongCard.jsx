import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, activeSong }) => {
  console.log("songs : ", song); // Log the entire song object to see its structure

  // Log the thumbnail URL to ensure it's correct
  console.log("Thumbnail URL: ", song.thumbnail);

  // The song object doesn't contain 'snippet' in your case
  const songTitle = song.title || "Unknown Title";
  const songImage = song.thumbnail || 'fallback_image_url.jpg'; // Fallback image URL

  // Function to handle setting the active song
  const handleSetActiveSong = () => {
    // Dispatch action to set active song (you might have your own logic to set this)
    setActiveSong(song); // Pass song object or required data to set active song
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer song-card-hover">
      <div className="relative w-full h-56 group">
        {/* Hover effect for each card */}
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song?.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause song={song} />
        </div>
        <img 
          alt={songTitle} 
          src={songImage}  // Ensure this is a valid URL
          className="w-full h-full object-cover" 
          onClick={handleSetActiveSong}  // Click to set the active song
        />
      </div>
      <div className="mt-2">
        <p className="text-white truncate">{songTitle}</p> {/* Use songTitle here */}
      </div>
    </div>
  );
};

export default SongCard;
