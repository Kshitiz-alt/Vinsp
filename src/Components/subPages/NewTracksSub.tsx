import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { SONGS } from "../../Constants/Fetch"
import type { Songtypes } from "../../types"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion'


const NewTracksSub = () => {
  const [playlists, setPlaylists] = useState<Songtypes[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const res = await SONGS("kylie", 5);
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
        <Link to="/newtracks" className="text-white text-lg tracking-wide cursor-pointer opacity-70 hover:opacity-100">{t('showall')}</Link>
      </div>
      <div className="flex gap-7 p-5">
        {playlists.map((song) => (
          <motion.img 
          whileHover={{scale:1.05}}
          className="min-w-[200px] h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer" 
          key={song.id} 
          src={song.image[2].url} 
          alt="songImage" />
        ))}

      </div>
    </section>
  )
}

export default NewTracksSub