import { motion } from 'framer-motion'
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { ALBUMS, ProperTitle } from "../../Constants/Fetch"
import type {
  PlaylistItemTypes,
  albumsTypes,
  OutletContextType, SearchTypes, selectedSongs
} from "../../types"
import PlaylistItem from "../../Components/subComponents/PlaylistItem"
import { BiPlay, BiPlus } from "react-icons/bi"
import Loader from '../../Components/subComponents/Animations/Loader'



const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [albumItem, setAlbumItem] = useState<PlaylistItemTypes[]>([]);
  const [albumData, setAlbumData] = useState<albumsTypes | null>(null);
  const [loading , setLoading] = useState(true)
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();
  const [isTitle, setTitle] = useState<string | null>(null);
  const { setSelectedSongs, setCurrentSong, setSelectedAlbums } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      try{
        const res = await ALBUMS(Number(id))
        if (res && res.album && res.result)
        console.log("albums?",res.result)
          setAlbumData(res.album.rows[0]);
        setAlbumItem(res.result);
      }catch(err){
        console.error("error while fetching albums",err)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [id]);
  

  useEffect(() => {
    return () => {
      if (playingAudio) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
      }
    }
  }, [playingAudio]);

  const handleNewAudio = (newAudio: HTMLAudioElement, title: string, song: SearchTypes) => {
    if (playingAudio && playingAudio !== newAudio) {
      playingAudio.pause()
      playingAudio.currentTime = 0
    };
    // newAudio.play();
    setPlayingAudio(newAudio);
    setTitle(title);

    const selected: selectedSongs = {
      artist: song.artist,
      title: song.title,
      audio: song.audio,
      duration: song.duration || 0,
      id: song.id,
      image: song.image,
      lyrics: song.lyrics
    };
    setCurrentSong(selected);

  };
 


  if (loading) {
    return (
      <section className="h-[96.8svh] max-sm:min-w-0 w-full">
        <figure className="h-full flex justify-center items-center text-white">
          <Loader/>
        </figure>
      </section>
    )
  }

  return (
    <section
      className={`relative flex  px-30 xl:flex-col xl:gap-10 max-sm:flex-col max-sm:px-0 max-sm:min-h-[100svh] md:min-h-[100svh] md:flex-col`}>
      {albumData?.image && (
        <figure className="fixed inset-0 bg-cover bg-no-repeat blur-[10px] max-sm:bg-center md:bg-center xl:bg-center"
          style={{ backgroundImage: `url(${albumData.image})` }}
        >
        </figure>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {albumData && (
          <figure className="relative top-30 flex items-end gap-5 max-sm:flex-col max-sm:items-center">
            <img className="xl:w-[384px] rounded-2xl shadow-sm max-sm:w-11/12 shadow-cream md:w-2/5 xl:1/4" src={albumData.image} alt="" />
            <div className="flex flex-col p-3 max-sm:flex-row md:flex-col-reverse xl:flex-col">
              <div className='flex gap-4 max-sm:flex-row-reverse xl:flex-row'>

                {albumItem.length > 0 && (
                  <motion.button
                    whileTap={{ rotate: 90, scale: 1.05 }}
                    type='button'
                    className=" text-darkcream flex justify-center items-center text-sm cursor-pointer bg-white/30 hover:bg-white/40 p-4 border-2 rounded-full md:hidden xl:block"
                    onClick={() => {
                      const selected = albumItem.map((song: selectedSongs) => ({
                        id: song.id,
                        title: song.title,
                        audio: song.audio,
                        image: song.image,
                        artist: song.artist,
                        duration: song.duration,
                        lyrics: song.lyrics
                      }))
                      setSelectedSongs(selected)
                      setCurrentSong(selected[0])
                    }}>
                    <BiPlay width={30} height={30} />
                  </motion.button>
                )}
                <motion.button
                  type='button'
                  whileTap={{ rotate: 90, scale: 0.95 }}
                  className="flex justify-center items-center text-darkcream text-sm border-2 rounded-full bg-white/30 hover:bg-white/40 cursor-pointer max-sm:hidden md:hidden xl:block xl:px-4"
                  onClick={() => {
                    if (!albumData) return;
                    setSelectedAlbums?.(prev => {
                      const exists = prev.some(a => a.id === albumData.id);
                      if (exists) return prev;
                      return [...prev, {
                        id: albumData.id,
                        title: albumData.title,
                        image: albumData.image,
                      }];
                    });
                  }}
                >
                  <BiPlus width={30} height={30} />
                </motion.button>
              </div>

              <figcaption className="text-white text-center xl:text-3xl xl:py-4 max-sm:text-sm max-sm:p-2.5 md:text-2xl">{ProperTitle(albumData.title)}</figcaption>
            </div>
          </figure>
        )}
      </motion.div>
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="w-3/4 flex flex-col gap-4 py-30 relative max-sm:w-full max-sm:top-20 md:w-full md:top-30 xl:top-0">

        {albumItem.map((element, index) => (
          <PlaylistItem
            key={element.id}
            S_no={index + 1}
            duration={element.duration}
            title={element.title}
            image={element.image}
            lyrics={element.lyrics}
            audio={element.audio}
            onAudioPlay={(audio) => handleNewAudio(audio, element.title, element)}
            isCurrent={isTitle === element.title}
            artist={element.artist}
            onSelect={(song, isChecked) => {
              const songSet = {
                title: song.title,
                audio: element.audio,
                image: element.image,
                lyrics: element.lyrics
              }
              setSelectedSongs((prev) => {
                if (isChecked) return [...prev, songSet]
                return prev.filter((s => s.audio !== songSet.audio))
              })
            }} />
        ))}
      </motion.aside>
    </section>
  )
}

export default AlbumsPage
