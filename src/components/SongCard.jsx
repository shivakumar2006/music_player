import {Link} from "react-router-dom";
import { useDispatch} from "react-redux";

import PlayPause from './PlayPause';
import { playPause, setActiveSong  } from "../redux/features/playerSlice";

const SongCard = ({song, i}) => {

  console.log(song);

  const activeSong = 'Test';

  const imageUrl= song?.images?.coverart || song?.images?.coverart || ''

  return (
    <div 
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer song-card-hover"
    >
      <div className="relative w-full h-56 group">
        {/* Hover effect for each card */}
        <div 
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
            <PlayPause />
        </div>
        <img alt="song_img" src={song.images?.coverart || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SongCard;
