
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { SONGS } from "../../Constants/Fetch"
import { type selectedSongs, type Songtypes } from "../../types"

import SongCard from "../../Components/subComponents/SongCard"
import { useOutletContext } from "react-router-dom"


type OutletContextType = {
  selectedSongs: selectedSongs[]
  setSelectedSongs: Dispatch<SetStateAction<selectedSongs[]>>
}


const NewTracksPage = () => {
  const [Tracks, setTracks] = useState<Songtypes[]>([])
  const { setSelectedSongs } = useOutletContext<OutletContextType>()


  useEffect(() => {
    const fetchData = async () => {
      const res = await SONGS("kylie", 40);
      if (res?.data) {
        setTracks(res.data.results)
      }
    }
    fetchData()
  }, [])

  


  return (
    <section className="relative h-screen overflow-y-scroll ">
      <div className="grid grid-cols-4 gap-7 p-5">
        {Tracks.map((songData) => (
          <SongCard
            key={songData.id}
            title={songData.name}
            image={songData.image[2].url}
            audio={songData.downloadUrl[4].url}
            artist={songData.artists[0]}
            onSelect={(song, isChecked) => {
              const songSet = {
                title: song.title,
                audio: songData.downloadUrl[4].url,
                image: songData.image[2].url
              }
              setSelectedSongs((prev) => {
                if (isChecked) return [...prev, songSet]
                return prev.filter((s => s.audio !== songSet.audio))
              })
            }}

          />
        ))}

      </div>
    </section>
  )
}

export default NewTracksPage