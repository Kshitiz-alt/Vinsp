import { useEffect, useState } from "react"
import { SONGS }  from "../../../Constants/Fetch"
import type { Songtypes } from "../../../types"
import { motion } from "framer-motion"

const Carousel = () => {
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SONGS("clover", 30)
        if (res?.data) {
          setPlaylists(res.data.results)
        }
      } catch {
        console.error("Failed to fetch")
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (playlists.length < 2) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % playlists.length)
    }, 3000)
    return () => clearInterval(interval)

  }, [playlists])

  return (
    <section className="w-full overflow-hidden p-20 max-sm:p-25">
      <div className="w-full">
        <motion.div
          className="flex gap-9"
          animate={{ x: `-${currentIndex * 460}px` }}
          transition={{ duration: 0.6, ease: "easeInOut" ,type:"spring" , stiffness:100 }}
        >
          {playlists.map((song) => (
            <motion.div
              key={song.id}
              className="min-w-[420px] h-[240px] rounded-xl overflow-hidden shadow-lg max-sm:max-w-30 max-sm:max-h-52 "
              initial={{opacity:.8}}
              whileHover={{ scale: 1.05 , opacity:10 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={song.image[2].url}
                alt={song.name}
                className="w-full h-full object-cover cursor-pointer "
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Carousel
