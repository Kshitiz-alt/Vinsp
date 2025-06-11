import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import api from "../../Constants/Fetch"
import type { Songtypes } from "../.."



const NewTracks = () => {
  const [playlists, setPlaylists] = useState<Songtypes[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await api("kylie", 5);
      if (res?.data) {
        setPlaylists(res.data.results)
      }

    }
    fetchData()
  }, [])
  const { t } = useTranslation()
  return (
    <section>
      <div className="flex justify-between">

        <h1 className="text-white text-2xl">{t('newTracks')}</h1>
        <p className="text-white text-lg tracking-wide cursor-pointer">{t('showall')}</p>
      </div>
      <div className="flex gap-7 p-5">
        {playlists.map((song) => (
          <img className="min-w-[200px] h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer" key={song.id} src={song.image[2].url} alt="" />
        ))}

      </div>
    </section>
  )
}

export default NewTracks