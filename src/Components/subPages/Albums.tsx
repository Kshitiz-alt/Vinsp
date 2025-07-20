// import { useState } from "react"
import { useTranslation } from "react-i18next"
// import { ALBUMS } from "../../Constants/Fetch"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { albumsProps } from "../../types"



const Albums = ({ albums }: albumsProps) => {

  const { t } = useTranslation()
  return (
    <section className="w-full">
      <div className="flex justify-between max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
        <h1 className="text-white text-3xl max-sm:text-lg">{t('hitAlbums')}</h1>
      </div>
      <div className="grid grid-cols-5 gap-7 p-5 xl:gap-10 max-sm:gap-35 md:gap-55 overflow-x-scroll">
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id} >
            <motion.figure
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >

              <img
                className="xl:w-[400px] xl:h-[240px] bg-gray-900 object-cover object-center rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:min-h-32 max-sm:min-w-32 md:min-w-45 md:min-h-45"
                src={album.image}
                alt="" />
              <figcaption className="text-white text-sm text-center max-sm:text-[10px] whitespace-nowrap">{album.title}</figcaption>
            </motion.figure>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Albums