import { useEffect, useState } from "react"
import { SONGS } from "../../../Constants/Fetch"
import type { Songtypes } from "../../../types"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Carousel = () => {
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SONGS("clover", 30)
        console.log(res)
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
    <section className="w-full overflow-hidden py-20 p-5 max-sm:py-25">
      <div className="w-full">
        <motion.div
          className="flex gap-9"
          animate={{ x: `-${currentIndex * 304}px` }}
          transition={{ duration: 0.6, ease: "easeInOut", type: "spring", stiffness: 50 }}
        >
          {playlists.map((song) => (
            <Link to={`/albums/${song.album?.id}`} key={song.id}>
              <motion.div

                className="w-[420px] h-[240px] rounded-xl overflow-hidden shadow-lg max-sm:w-[270px] max-sm:max-h-52 "
                initial={{ opacity: .8 }}
                whileHover={{ scale: 1.05, opacity: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={song.image[2].url}
                  alt=""
                  className="w-full h-full object-cover cursor-pointer "
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Carousel
