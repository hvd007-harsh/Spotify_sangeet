import {useState} from 'react';
import useSpotify from '@/hooks/useSpotify';
import {
    millisToMinutesAndSeconds
} from "../lib/time";
import { useRecoilState } from 'recoil';
import {isPlayingState} from '../atoms/songAtom';

function Song({
    order,
    track
}) {
    const spotifyApi = useSpotify();
    const [isPlaying , setIsPlaying] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useRecoilState(isPlayingState);

    const playsong =  ()=>{
        console.log(track.track);

       setCurrentTrackId(track.track.id);
       setIsPlaying(true);
       spotifyApi.play({
         uris: [track.track.uri]
       })
    }
    return ( <div className = 'grid grid-cols-2 text-gray-500 py-2 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playsong}>
        <div className = 'flex items-center space-x-4' >
        <p> {
            order + 1
        } </p>  
        <img src = {track.track.album.images[0].url}
        className = "w-10 h-10"
        alt = "" />
        <div>
        <p className = 'w-36 lg:w-64 text-white truncate' > {track.track.name} </p> 
        <p> {track.track.artists[0].name} </p> 
        </div>

        <div className = 'flex items-center justify-between ml-auto md:ml-0 ' >
        <p className = 'w-40 hidden md:inline w-40' > {
            track.track.album.name
        } </p> 
        <p className='ml-10'> {
            millisToMinutesAndSeconds(track.track.duration_ms)
        } </p> </div> 
        <hr className = 'text-gray-500 ' />
        </div> 
        </div>
    )
}

export default Song;