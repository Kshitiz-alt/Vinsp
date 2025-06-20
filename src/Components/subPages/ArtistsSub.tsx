import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import type { artistTypes } from "../../types";
import { ARTISTS } from "../../Constants/Fetch";

const ArtistsSub = () => {
    const [artist, setArtist] = useState<artistTypes[]>([])

    useEffect(() => {

        const ids = ["1274170", "1906686", "3871652", "670448"];
        const fetchData = async () => {
            const res = await Promise.all(
                ids.map(id => ARTISTS(id))
            )
            const validRes = res.filter(artist => artist != null)
            setArtist(validRes)
        }
        fetchData()
    }, [])

    const { t } = useTranslation()

    return (
        <section className="max-sm:w-74">
            <div className="flex justify-between">

                <h1 className="text-white text-2xl">{t('artistTrack')}</h1>
                <Link to="/newtracks" className="text-white text-lg tracking-wide cursor-pointer opacity-70 hover:opacity-100">{t('showall')}</Link>
            </div>
            <div className="grid grid-cols-5 gap-7 p-5 max-sm:gap-35 overflow-x-scroll">
                {artist.map((userName) => (
                    <div key={userName.id}>
                        <motion.img
                            className="min-w-0 h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:max-h-32 max-sm:max-w-32"
                            src={userName.image[2].url} alt=""
                        />
                        <p className="text-white text-sm text-center max-sm:text-[10px] whitespace-nowrap">{userName.name}</p>

                    </div>
                ))}

            </div>
        </section>
    )
}

export default ArtistsSub