import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components'; 
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery(50);
    const genreTitle = 'pop';

    if (isFetching) return <Loader title='Loading Songs...' />;

    if (error) {
        if (error.status === 502) {
            return <Error message="API is currently unavailable. Please try again later." />;
        }
        return <Error />;
    }

    console.log("API response : ", data); // Log full response

    return (
        <div className="flex flex-col"> 
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select 
                   onChange={() => {}}
                   value=''
                   className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5' 
                >
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data ? (
                    data.map((song, i) => {
                        const songId = song?.videoId || `${song?.kind}_${i}`; // Use videoId as fallback key

                        // Ensure that we have enough data to render, even if thumbnails or snippet are missing
                        if (!song?.videoId) {
                            console.error("Missing videoId for song: ", song);
                            return null; // Skip rendering if videoId is missing
                        }

                        return (
                            <SongCard 
                                key={songId} // Use videoId as key
                                song={song} 
                                isPlaying={isPlaying}
                                activeSong={activeSong} 
                                data={data} // Pass the whole song object to SongCard
                                i={i}
                            />
                        );
                    })
                ) : (
                    <p>No songs available</p>
                )}
            </div>
        </div>
    );
}

export default Discover;
