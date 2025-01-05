import { useDispatch } from "react-redux";
import PlayPause from './PlayPause';
import { setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, activeSong }) => {
  // Log the full song object to check its structure
  console.log("Full song object: ", song);

  // Fallback logic for the thumbnail
  const songTitle = song.title || "Unknown Title";

  // Check if the thumbnail URL is valid or fallback to a placeholder image
  const songImage = song.thumbnail && song.thumbnail !== 'fallback_image_url.jpg' 
    ? song.thumbnail 
    : 'https://via.placeholder.com/250x250';  // Fallback placeholder image if invalid thumbnail

  const handleSetActiveSong = () => {
    setActiveSong(song); // Pass song object to set active song
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer song-card-hover">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song?.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause song={song} />
        </div>
        <img 
          alt={songTitle} 
          src={songImage}  // Use the song's thumbnail or fallback image
          className="w-full h-full object-cover" 
          onClick={handleSetActiveSong}  // Click to set the active song
        />
      </div>
      <div className="mt-2">
        <p className="text-white truncate">{songTitle}</p> {/* Display song title */}
      </div>
    </div>
  );
};

export default SongCard;
