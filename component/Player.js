import React,{useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';

function Player() {
    const spotifyApi = useSpotify();
    const {data : session , status } = useSession();
    const [currentTrackId,setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume ] = useState(50);

    const songInfo = useSongInfo();
    
    const fetchCurrentSong =()=>{
          if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data=>{
              console.log("Now playing:",data.body?.item?.id); 
              setCurrentIdTrack(data.body?.item?.id);
              spotifyApi.getMyCurrentPlaybackState().then(data=>{
                setIsPlaying(data.body?.is_playing);
              })
            })          
          }
    }
    const handlePause = ()=>{
      spotifyApi.getMyCurrentPlaybackState().then(data=>{
        if(data.body.is_playing){
          spotifyApi.pause();
          setIsPlaying(false);
        }else{
          spotifyApi.play();
          setIsPlaying(true);
        }
      })
    }
    useEffect(()=>{
      if(spotifyApi.getAccessToken() && !currentTrackId){
         fetchCurrentSong(); 
         setVolume(50);
      }
    },[currentTrackIdState,spotifyApi,session])

  return (
    <div className='h-24 bg-black bg-gradient-to-b from-black-to-gray text-white grid grid-cols-5 text-xs md:text-base px-2 md:px-8 '>
        <div>
          <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt='' />
        </div>
        <div>
          <h3 className='text-white md:inline h-10'>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        {/* Center */}
        <div className='flex items-center justify-evenly '>
            <SwitchHorizontalIcon className='button' />
            <RewindIcon
            onClick={()=>{spotifyApi.skipToPrevious()}} 
            className="button"/>
            
            {isPlaying?(
              <PauseIcon onClick={handlePause} className='button w-10 h-10' />
            ) :(
              <PlayIcon onClick={handlePause} className='button w-10 h-10' />
            )}
            <FastForwardIcon
            onClick={()=>{ spotifyApi.skipToNext()}}
            className = "button"/>
            <ReplyIcon className='button'/>
        </div>
    </div>

  )
}

export default Player