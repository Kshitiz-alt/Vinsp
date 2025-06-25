
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import type { selectedSongs } from "../../types"
import { ProperTitle } from '../../Constants/Fetch'
import { useLayoutContext } from '../../Constants/Context'

const Playbar = ({ song }: { song: selectedSongs }) => {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [extendPlayer, setExtendPlayer] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const {extend} = useLayoutContext()

    useEffect(() => {
        if (extendPlayer) {
            const timeout = setTimeout(() => setExtendPlayer(false), 10000)
            return () => clearTimeout(timeout)
        }
    }, [extendPlayer, song]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && song.audio) {
            setDuration(0);
            setCurrentTime(0);
            // audio.load();
            audio.play().catch((err) => {
                console.warn(err)
            })
        }
    }, [song])

    const handleUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime)
            setDuration(audio.duration || 0)
        }

    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Number(e.target.value);
        }
    };


    return (
        <AnimatePresence>
            <motion.figure
                key="playbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, type: "tween" }}


                className={`fixed  z-40 bg-Gray/50 backdrop-blur-2xl inset-shadow-2xs inset-shadow-cream h-18 p-3 rounded-full flex items-center gap-2 transition-all duration-200 ease-in-out
                    ${extendPlayer ? "w-1/2 cursor-default" : "w-18 cursor-pointer"}
                    ${extend ? "bottom-10 right-20" : "bottom-10 left-20"}
                    `}
                onClick={() =>{
                    setExtendPlayer(!extendPlayer)
                    
                }
                }
            >
                <img className="w-12 rounded-full shadow-2xs shadow-cream" src={song.image} alt="" />
                {extendPlayer && (
                    <div className='flex gap-10'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3 }}
                            className="flex flex-col">
                            <p className="text-white">{ProperTitle(song.title)}</p>
                            <span className='text-cream'>{song.artist}</span>
                        </motion.div>
                        <motion.input
                            className='cursor-pointer'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3 }}
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            onClick={(e) => e.stopPropagation()} />

                    </div>
                )}
                <audio ref={audioRef} className='bg-white w-60' src={song.audio} onTimeUpdate={handleUpdate} onLoadedMetadata={handleUpdate} autoPlay></audio>
            </motion.figure>


        </AnimatePresence>
    )
}

export default Playbar