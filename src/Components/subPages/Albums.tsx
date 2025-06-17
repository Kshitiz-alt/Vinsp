import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ALBUMS } from "../../Constants/Fetch"
import type { albumsTypes } from "../../types"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"


const Albums = () => {
  const [albums, setAlbums] = useState<albumsTypes[]>([])

  useEffect(() => {
    const ids = ["23241654", "61765108", "59189008"]
    const fetchData = async () => {
      const res = await Promise.all(
        ids.map(id => ALBUMS(id))
      )
      console.log(res)
      const validRes = res
        .filter(albums => albums !== undefined)
        .map(album => (
          {
            id: album.data.id,
            name: album.data.name,
            image: album.data.image,
          }
        ));
      setAlbums(validRes)
    }
    fetchData()
  }, [])

  const { t } = useTranslation()

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-white text-2xl">{t('hitAlbums')}</h1>
      </div>
      <div className="flex gap-7 p-5">
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="min-w-[200px] h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              key={album.id}
              src={album.image[2].url}
              alt="" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Albums