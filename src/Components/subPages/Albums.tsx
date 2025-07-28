// import { useState } from "react"
import { useTranslation } from "react-i18next"
// import { ALBUMS } from "../../Constants/Fetch"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { albumsProps } from "../../types"



const Albums = ({ albums }: albumsProps) => {

  const { t } = useTranslation()
  return (
    <section className="w-full flex flex-col gap-4 overflow-hidden rounded-3xl py-6 max-sm:px-2">
      <div className="flex justify-between max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
        <h1 className="text-white text-3xl max-sm:text-lg">{t('hitAlbums')}</h1>
      </div>
      <div className="flex gap-3.5 overflow-x-auto p-2">
        {albums.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id} >
            <motion.figure
            className="xl:w-[260px] xl:h-[250px] md:w-[280px] md:h-[180px] max-sm:w-35 max-sm:h-35 rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer bg-Gray/20 p-1"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >

              <img
                className="w-full h-11/12 object-cover object-center rounded-xl"
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