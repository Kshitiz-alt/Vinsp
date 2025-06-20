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
    <section className="max-sm:w-74">
      <div className="flex justify-between">

        <h1 className="text-white text-2xl">{t('newTracks')}</h1>
        <Link to="/newtracks" className="text-white text-lg tracking-wide cursor-pointer opacity-70 hover:opacity-100">{t('showall')}</Link>
      </div>
      <div className=" gap-10 max-sm:gap-35 p-5 grid grid-cols-5 max-sm:overflow-x-scroll">
        {playlists.map((song) => (
          <motion.img 
          whileHover={{scale:1.05}}
          className="min-w-0 h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:max-h-32 max-sm:max-w-32" 
          key={song.id} 
          src={song.image[2].url} 
          alt="songImage" />
        ))}

      </div>
    </section>
  )
}

export default NewTracksSub