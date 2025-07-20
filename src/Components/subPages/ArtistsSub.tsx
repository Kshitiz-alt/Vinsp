import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import type { artistProps  } from "../../types";

const ArtistsSub = ({artist}:artistProps) => {

    const { t } = useTranslation()

    return (
        <section className="w-full">
            <div className="flex justify-between items-center max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
                <h1 className="text-white text-3xl max-sm:text-lg">{t('artistTrack')}</h1>
            </div>
            <div className="grid grid-cols-5 gap-7 p-5 xl:gap-10  max-sm:gap-35 md:gap-55 overflow-x-scroll">
                {artist.map((userName) => (
                    <Link to={`/artists/${userName.id}`} key={userName.id}>
                        <motion.figure
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                className="xl:w-[400px] object-center xl:h-[240px] object-cover bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:min-w-32 max-sm:min-h-32 md:min-w-45 md:min-h-45"
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