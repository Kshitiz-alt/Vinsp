import { useEffect, useState } from "react"
import { CAROUSEL } from "../../../Constants/Fetch"
import type { Songtypes } from "../../../types"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Carousel = () => {
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch data
  useEffect(() => {
    try {
      const fetchData = async () => {
        const ids = ["1007", "1002", "1003", "1004", "1005", "1006", "1008", "1009", "1010", "1011"];
        const res = await Promise.all(
          ids.map(id => CAROUSEL(Number(id)))
        )
        if (res) {
          console.log("these are songs?", res)
          setPlaylists(res)
        }
      }
      fetchData()
    } catch {
      console.error("Failed to fetch")
    }
  }, [])

  useEffect(() => {
    if (playlists.length < 2) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % playlists.length)
    }, 3000)

    return () => clearInterval(interval)

  }, [playlists])

  return (
    <section className="w-full overflow-hidden rounded-3xl py-22 p-5 max-sm:py-25 md:p-22">

      <motion.div
        className="flex gap-9"
        animate={{ x: `-${currentIndex * 304}px` }}
        transition={{ duration: 0.6, ease: "easeInOut", type: "spring", stiffness: 50 }}
      >
        {playlists
          .map((song) => (
            <Link
              to={`/albums/${song.id}`} key={song.id}
            >
              <motion.div
                className="xl:w-[420px] xl:h-58 rounded-xl overflow-hidden shadow-lg max-sm:w-[270px] max-sm:h-52 md:h-48 md:w-[240px]"
                initial={{ opacity: .8 }}
                whileHover={{ scale: 1.05, opacity: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={song.image}
                  alt=""
                  className="w-full h-full object-cover cursor-pointer "
                />
              </motion.div>
            </Link>
          ))}
      </motion.div>
    </section>
  )
}

export default Carousel
