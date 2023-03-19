import {
   ChevronDownIcon
} from "@heroicons/react/outline";
import {
   signOut,
   useSession
} from "next-auth/react"
import {
   shuffle
} from 'lodash';
import {
   useState,
   useEffect
} from "react";
import { useRecoilState, useRecoilValue} from 'recoil';
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";

/*Components*/
import Songs from './Songs';

const colors = [
   "from-indigo-500",
   "from-blue-500",
   "from-green-500",
   "from-red-500",
   "from-yellow-500",
   "from-pink-500",
   "from-purple-500",
]

function Center(){
   const {
      data: session
   } = useSession();
   const spotifyApi = useSpotify();
   const [color, setColor] = useState(null);
   const playlistId = useRecoilValue(playlistIdState);
   console.log(playlistId);
   const [playlist,setPlaylists] = useRecoilState(playlistState);

   useEffect(() => {
      setColor(shuffle(colors).pop());
   }, [playlistId]);

   useEffect(()=>{
   if(spotifyApi.getAccessToken()){
   spotifyApi.getPlaylist(playlistId).then((data)=>{
      setPlaylists(data.body);
   }).catch(error => console.log("Something went wrong",error))
   }
   },[spotifyApi,playlistId]);

   return(<div className = "flex-grow h-screen overflow-y-scroll no-scrollbar" >
      <header className = "absolute top-5 right-8" >
      <div className = "flex items-center bg-green-400 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" onClick={signOut} >
      <img className = "rounded-full w-10 h-10" src = {session ?.user.image} alt = "profile_pic" />
      <h2 className = "text-white" > {
         session ?.user.name
      } </h2> <ChevronDownIcon className = " h-5 w-5" />
      </div> 
      </header> 
      <section className = "flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white padding-8" >
      <img className = "h-44 w-44 shadow-2xl"
       src = { playlist?.images?.[0]?.url} alt="" />
       <h1 className="font-bold h-20 text-4xl">{playlist?.name}</h1> 
      </section>

      <div className='px-8 space-y-1 pb-2 text-white '>
         <Songs  playlist={playlist} />
      </div>

      </div>
   )
}
export default Center