import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ALBUMS } from "../../Constants/Fetch"
import type { albumsTypes } from "../../types"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"


const Albums = () => {
  const [albums, setAlbums] = useState<albumsTypes[]>([])

  useEffect(() => {
    const ids = ["23241654", "49720765", "57614295","45320251","33008911"]
    const fetchData = async () => {
      const res = await Promise.all(
        ids.map(id => ALBUMS(id))
      )
      // console.log(res)
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
    <section className="w-full">
      <div className="flex justify-between max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
        <h1 className="text-white text-2xl max-sm:text-lg">{t('hitAlbums')}</h1>
      </div>
      <div className="grid grid-cols-5 gap-7 p-5 xl:gap-10 max-sm:gap-35 md:gap-55 overflow-x-scroll">
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id} >
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="xl:w-[400px] xl:h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:max-w-32 max-sm:max-h-32 md:min-w-45 md:min-h-45"
              src={album.image?.[2]?.url}
              alt="" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Albums