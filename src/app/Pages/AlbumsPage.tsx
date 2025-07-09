import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { ALBUMS, ProperTitle } from "../../Constants/Fetch"
import type {
  PlaylistItemTypes,
  albumsTypes,
  OutletContextType, SearchTypes, selectedSongs
} from "../../types"
import PlaylistItem from "../../Components/subComponents/PlaylistItem"



const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [albumItem, setAlbumItem] = useState<PlaylistItemTypes[]>([]);
  const [albumData, setAlbumData] = useState<albumsTypes | null>(null);

  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();
  const [isTitle, setTitle] = useState<string | null>(null);
  const { setSelectedSongs, setCurrentSong } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      // console.log("id!", id)
      const res = await ALBUMS(Number(id))
      console.log("songssss", res.songs)
      if (res && res.album && res.songs)
        setAlbumData(res.album);
      setAlbumItem(res.songs);
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
      image: song.image
    };
    setCurrentSong(selected);

  };

  return (
    <section className={`relative flex  px-30 xl:flex-col xl:gap-10 max-sm:flex-col max-sm:px-0 max-sm:min-h-[100svh] md:min-h-[100svh] md:flex-col`}>
      {/* <div className="fixed top-15 z-20 max-sm:p-20 max-sm:w-full max-sm:h-1/2 max-sm:backdrop-blur-[5px] max-sm:top-5 md:p-5 md:backdrop-blur-[5px] xl:p-30 xl:backdrop-blur-none"> */}


      {albumData?.image && (
        // <figure className="flex xl:flex-col max-sm:flex-col gap-2 md:flex-row">
        <figure className="fixed inset-0 bg-cover bg-no-repeat blur-[10px] max-sm:bg-center md:bg-center xl:bg-center"
          style={{ backgroundImage: `url(${albumData.image})` }}
        >
        </figure>
      )}
      <div>
        {albumData && (
          <figure className="relative top-30 flex items-end gap-2 max-sm:flex-col max-sm:items-center">
            <img className="xl:w-[384px] rounded-2xl shadow-sm max-sm:w-11/12 shadow-cream md:w-1/4" src={albumData.image} alt="" />
            <figcaption className="text-white text-center xl:text-4xl max-sm:text-sm md:text-2xl">{ProperTitle(albumData.title)}</figcaption>
          </figure>
        )}
      </div>
      <aside className="w-3/4 flex flex-col gap-4 py-30 relative max-sm:w-full max-sm:top-20 md:w-full md:top-30 xl:top-0">

        {albumItem.map((element,index) => (
          <PlaylistItem
            key={element.id}
            S_no={index + 1}
            duration={element.duration}
            title={element.title}
            image={element.image}
            audio={element.audio}
            onAudioPlay={(audio) => handleNewAudio(audio, element.title, element)}
            isCurrent={isTitle === element.title}
            artist={element.artist}
            onSelect={(song, isChecked) => {
              const songSet = {
                title: song.title,
                audio: element.audio,
                image: element.image
              }
              setSelectedSongs((prev) => {
                if (isChecked) return [...prev, songSet]
                return prev.filter((s => s.audio !== songSet.audio))
              })
            }} />
        ))}
      </aside>
    </section>
  )
}

export default AlbumsPage
