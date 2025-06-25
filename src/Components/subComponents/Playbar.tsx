
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from "react"
import type { selectedSongs } from "../../types"

const Playbar = ({ song }: { song: selectedSongs }) => {

    const [extend, setExtend] = useState(false)
    useEffect(() => {
        if (extend) {
            const timeout = setTimeout(() => setExtend(false), 5000)
            return () => clearTimeout(timeout)
        }
    }, [extend, song])
    return (
        <AnimatePresence>
            <motion.figure
                key="playbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, type: "tween" }}


                className={`fixed bottom-10 left-20 z-40 bg-Gray/50 backdrop-blur-2xl h-18 p-3 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out
                    ${extend ? "w-1/2" : "w-18"}
                    `}
                onClick={() =>
                    setExtend(!extend)
                }
            >
                <img className="w-12 rounded-full" src={song.image} alt="" />
                {extend && (
                    <div className='flex gap-10'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{duration:3}}
                            className="flex flex-col">
                            <p className="text-white">{song.title}</p>
                            <span>{song.artist}</span>
                        </motion.div>
                        {/* <input className='w-96' type="range" min={0} max={100} defaultValue={0}  id="" /> */}
                    </div>
                )}
            </motion.figure>
        </AnimatePresence>
    )
}

export default Playbar