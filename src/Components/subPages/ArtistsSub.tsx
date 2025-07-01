import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import type { artistTypes } from "../../types";
import { ARTISTS } from "../../Constants/Fetch";

const ArtistsSub = () => {
    const [artist, setArtist] = useState<artistTypes[]>([])

    useEffect(() => {

        const ids = ["644945", "1906686", "3871652", "670448"];
        const fetchData = async () => {
            const res = await Promise.all(
                ids.map(id => ARTISTS(id))
            )

            const validRes = res.filter(data => data !== null).map(data => data!.artists)
            setArtist(validRes)
        }
        fetchData()
    }, [])

    const { t } = useTranslation()

    return (
        <section className="w-full">
            <div className="flex justify-between items-center max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
                <h1 className="text-white text-2xl max-sm:text-lg">{t('artistTrack')}</h1>
            </div>
            <div className="grid grid-cols-5 gap-7 p-5 xl:gap-10  max-sm:gap-35 md:gap-55 overflow-x-scroll">
                {artist.map((userName) => (

                    <Link to={`/artists/${userName.id}`} key={userName.id}>
                        <motion.img
                            className="xl:w-[400px] xl:h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:max-h-32 max-sm:max-w-32 md:min-w-45 md:min-h-40"
                            src={userName.image?.[2].url} alt=""
                        />
                        <p className="text-white text-sm text-center max-sm:text-[10px] whitespace-nowrap">{userName.name}</p>
                    </Link>
                ))}

            </div>
        </section>
    )
}

export default ArtistsSub