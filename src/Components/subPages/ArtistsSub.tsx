import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import type { artistProps  } from "../../types";

const ArtistsSub = ({artist}:artistProps) => {

    const { t } = useTranslation()

    return (
        <section className="w-full overflow-hidden rounded-3xl py-6 max-sm:px-2">
            <div className="flex justify-between items-center max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
                <h1 className="text-white text-3xl max-sm:text-lg">{t('artistTrack')}</h1>
            </div>
            <div className="flex gap-3.5 overflow-x-auto p-2">
                {artist.map((userName) => (
                    <Link to={`/artists/${userName.id}`} key={userName.id}>
                        <motion.figure
                            whileHover={{ scale: 1.05 }}
                            className="xl:w-[260px] xl:h-[250px] md:w-[280px] md:h-[180px] max-sm:w-35 max-sm:h-35 rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer bg-Gray/20 p-1"
                        >
                            <img
                                className="w-full h-11/12 object-cover object-center rounded-xl"
                                src={userName.image} alt=""
                            />
                            <p className="text-white text-sm text-center max-sm:text-[10px] whitespace-nowrap">{userName.title}</p>
                        </motion.figure>
                    </Link>
                ))}

            </div>
        </section>
    )
}

export default ArtistsSub