import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import Song from '../component/Song';

function Songs() {
    const playlist = useRecoilValue(playlistState);
  return (
    <>
    {
        /* <div className='overflow-y-scroll no-scrollbar'>
    {playlist && playlist.tracks.items.map((song)=>{
      return <div className='text-white'>{song.track.name}</div>
    })}
    </div> */
    }
   
    <div className="px-8 flex flex-col space-y-1 pb-8 text-white">
      {playlist?.tracks.items.map((track,i)=>{
        return <Song track={track} order={i} />
      })}
    </div>
    </>
  )
}

export default Songs;