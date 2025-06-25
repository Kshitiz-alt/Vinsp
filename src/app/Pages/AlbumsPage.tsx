import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { ALBUMS, ProperTitle } from "../../Constants/Fetch"
import type { AlbumItemTypes, albumsTypes, SearchTypes, selectedSongs } from "../../types"
import AlbumItem from "../../Components/subComponents/AlbumItem"

type OutletContextType = {
  selectedSongs: selectedSongs[]
  setSelectedSongs: Dispatch<SetStateAction<selectedSongs[]>>
  setCurrentSong: Dispatch<SetStateAction<selectedSongs | null>>
}


const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [albumItem, setAlbumItem] = useState<AlbumItemTypes[]>([])
  const [albumData, setAlbumData] = useState<albumsTypes | null>(null)
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>()
  const [isTitle, setTitle] = useState<string | null>(null)
  const { setSelectedSongs, setCurrentSong } = useOutletContext<OutletContextType>()

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const res = await ALBUMS(id)
      console.log(res)
      if (res?.data) {
        setAlbumData(res.data)
        setAlbumItem(res.data.songs)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
  }, [playingAudio])

  const handleNewAudio = (newAudio: HTMLAudioElement, title: string, song:SearchTypes) => {
    if (playingAudio && playingAudio !== newAudio) {
      playingAudio.pause()
      playingAudio.currentTime = 0
    };
    newAudio.play();
    setPlayingAudio(newAudio);
    setTitle(title);

    const selected: selectedSongs = {
      artist: song.artists?.all[0].name,
      title: song.title || song.name,
      audio: song.downloadUrl[4].url,
      id: song.id,
      image: song.image?.[2]?.url || ""
    };
    setCurrentSong(selected);

  }
  return (
    <section className="relative flex max-sm:flex-col max-sm:min-h-screen">
      <div className="fixed p-30 top-15 z-20 max-sm:p-20 max-sm:w-full max-sm:backdrop-blur-[5px] max-sm:top-5">
        {albumData?.image?.[2]?.url && (
          <div className="flex flex-col">
            <img className="w-[24em] rounded-2xl shadow-lg shadow-cream" src={albumData.image[2].url} alt="" />
            <span className="text-white text-center">{ProperTitle(albumData.name)}</span>
          </div>
        )}
      </div>
      <aside className="ml-[45em] flex flex-col gap-4 py-50 relative max-sm:ml-0 max-sm:mt-52">
        {albumItem.map((element) => (
          <AlbumItem
            key={element.id}
            duration={element.duration}
            title={element.name}
            image={element.image[2].url}
            audio={element.downloadUrl[4].url}
            onAudioPlay={(audio) => handleNewAudio(audio,element.title,element)}
            isCurrent={isTitle === element.title}
            artists={[...new Set(element.artists.all.map(artist => artist.name))]}
            onSelect={(song, isChecked) => {
              const songSet = {
                title: song.title,
                audio: element.downloadUrl[4].url,
                image: element.image[2].url
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