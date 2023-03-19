import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import {
  HomeIcon,
  HeartIcon,
  RssIcon,
  LibraryIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import {useEffect, useState } from 'react';
import {playlistIdState,playlistState} from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import { redirect } from 'next/dist/server/api-utils';
import Center from './Center';

function Sidebar() {
  const spotifyApi = useSpotify();
  const {data : session , status} = useSession();
  const [playlist,setPlaylists] = useState(null);
  const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);

  console.log("You picked playlist",playlistId); 
  useEffect(()=>{
      if(spotifyApi.getAccessToken()){
        spotifyApi.getUserPlaylists(session).then((data)=>{
          setPlaylists(data.body.items);
        })
      }
  },[session, spotifyApi])
  console.log(playlist);
  return (
    <div>
      <div className="bg-black lg:text-sm text-xs  h-screen p-5 overflow-y-scroll no-scrollbar sm:max-w-[12rem] lg:max-w-[12rem] text-sm text-gray-500 hidden md:inline-flex pb-36">
        <div className="space-y-4">
          <button className="space-x-2 items-centre hover:text-white  flex ">
            <HomeIcon className="h-5 w-5 hover:text-white" />
            Home
          </button>
          <button className="space-x-2 items-centre hover:text-white  flex ">
            <SearchIcon className="h-5 w-5  hover:text-white" />
            Search
          </button>
          <button className="space-x-2 items-centre hover:text-white  flex ">
            <LibraryIcon className="h-5 w-5" />
            Library
          </button>
          <hr className="border-t-[0,1.px] border-gray-900" />
          <button className="space-x-2 items-centre hover:text-white  flex ">
            <HeartIcon className="h-5 w-5  " />
            <p>Liked Song</p>
          </button>
          <button className="space-x-2 items-centre hover:text-white  flex">
            <RssIcon className="h-5 w-5  " />
            <p className="cursor">Your Library</p>
          </button>
          <button className="space-x-2 items-centre hover:text-white  flex">
            <PlusCircleIcon className="h-5 w-5  " />
            <p>Add Playlist</p>
          </button>
          <hr className="border-t-[0,1.px] border-gray-900" />
          {playlist && playlist.map((playlist)=>{
           return <p key={playlist.id} onClick={()=>{setPlaylistId(playlist.id)}} className="cursor-pointer hover:text-white">{playlist.name}</p>
          })}

        </div>
      </div>
    </div>
  );
}
export default Sidebar;
