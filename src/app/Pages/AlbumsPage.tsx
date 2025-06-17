import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { ALBUMS } from "../../Constants/Fetch"
import type { AlbumItemTypes, selectedSongs } from "../../types"
import AlbumItem from "../../Components/subComponents/AlbumItem"

type OutletContextType = {
  selectedSongs: selectedSongs[]
  setSelectedSongs: Dispatch<SetStateAction<selectedSongs[]>>
}


const AlbumsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [albumItem, setAlbumItem] = useState<AlbumItemTypes[]>([])
  const { setSelectedSongs } = useOutletContext<OutletContextType>()


  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const res = await ALBUMS(id)
      // console.log(res)
      if (res?.data) {
        setAlbumItem(res.data.songs)
        console.log(res.data.songs)
      }
    }
    fetchData()
  }, [id])


  return (
    <section className="relative flex h-full">
      <div className="fixed p-20 ">
        {albumItem.length > 0 && albumItem[0].image && (
          <img className="w-[24em]  inset-shadow-2xl shadow-lg shadow-cream" src={albumItem[0].image[2].url} alt="" />
        )}
      </div>
      <aside className="ml-[45em] flex flex-col gap-4">
        <header>

        </header>
        {albumItem.map((element) => (
          <AlbumItem
            key={element.id}
            duration={element.duration}
            title={element.name}
            image={element.image[2].url}
            audio={element.downloadUrl[4].url}
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
            } } />
        ))}
      </aside>
    </section>
  )
}

export default AlbumsPage