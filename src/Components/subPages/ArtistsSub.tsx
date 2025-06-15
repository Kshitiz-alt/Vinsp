import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import type { artistTypes } from "../../types";
import { ARTISTS } from "../../Constants/Fetch";

const ArtistsSub = () => {
    const [artist, setArtist] = useState<artistTypes[]>([])

    useEffect(() => {
        
        const ids = ["1274170", "1906686","3871652","670448"];
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
        <section>
            <div className="flex justify-between">

                <h1 className="text-white text-2xl">{t('artistTrack')}</h1>
                <Link to="/newtracks" className="text-white text-lg tracking-wide cursor-pointer opacity-70 hover:opacity-100">{t('showall')}</Link>
            </div>
            <div className="flex gap-7 p-5">
                {artist.map((userName) => (
                    <div  key={userName.id}>
                        <p>{userName.name}</p>
                        <motion.img 
                        className="min-w-[200px] h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer" 
                        key={userName.id} src={userName.image[2].url} alt="" />

                    </div>
                ))}

            </div>
        </section>
    )
}

export default ArtistsSub