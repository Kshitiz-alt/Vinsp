
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import type { PlayProps } from "../../types";
import { ProperTime, ProperTitle } from '../../Constants/Fetch';
import { useLayoutContext } from '../../Constants/Context';
import { LuPause, LuPlay } from 'react-icons/lu';
import { BiVolumeFull, BiVolumeLow } from 'react-icons/bi';






const Playbar = ({ song, onEnd, setSelectedSong }: PlayProps) => {

    //State handling
    const audioRef = useRef<HTMLAudioElement>(null);
    const [extendPlayer, setExtendPlayer] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [volume, SetVolume] = useState(1)


    //Child component handling
    const { extend } = useLayoutContext();


    //Mounts when the player extends - fallback
    useEffect(() => {
        if (extendPlayer) {
            const timeout = setTimeout(() => setExtendPlayer(false), 10000)
            return () => clearTimeout(timeout)
        }
    }, [extendPlayer, song]);

    //Fetching data through audioRef for Audio data
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && song.audio) {
            audio.src = song.audio;
            setDuration(0);
            setCurrentTime(0);
            setPlaying(false);
        }

        return () => {
            if (audio) {
                audio.pause()
            }
        }
    }, [song]);

    //Fallback when the data becomes null
    useEffect(() => {

        const audio = audioRef.current;
        if (!audio) return;
        const handleEnd = () => {
            setPlaying(false);
            onEnd();
        }
        audio.addEventListener("ended", handleEnd);
        return () => audio.removeEventListener("ended", handleEnd)

    }, [onEnd]);


    //Handlers
    //handle to update prev song to next song
    const handleUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime)
            setDuration(audio.duration || 0)
        }
    }

    //handle to play song
    const onPlayHandle = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause()
            setPlaying(false)
        } else {
            audio
                .play()
                .then(() => setPlaying(true))
        }
    };

    //handle for rendering the currentTime
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Number(e.target.value);
        }
    };

    //Volume handlers
    const VolumeUp = () => {
        if (audioRef.current) {
            const vol = Math.min(1, volume + 0.1)
            audioRef.current.volume = vol
            SetVolume(vol)
        }
    }
    const VolumeDown = () => {
        if (audioRef.current) {
            const vol = Math.max(0, volume - 0.1);
            audioRef.current.volume = vol
            SetVolume(vol)
        }
    }


    return (
        <AnimatePresence>
            <motion.figure
                key="playbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, type: "tween" }}


                className={`fixed z-40 bg-Gray/50 backdrop-blur-2xl inset-shadow-2xs inset-shadow-cream h-18 p-3 rounded-full flex items-center gap-2 transition-all duration-200 ease-in-out
                    ${extendPlayer ? "xl:w-7/12 cursor-default max-sm:w-11/12 md:w-8/12" : "w-18 cursor-pointer"}
                    ${extend ? "bottom-10 right-20" : "bottom-10 xl:left-20 max-sm:left-3 md:left-5"}
                    `}
                onClick={() => {
                    setExtendPlayer(!extendPlayer)

                }
                }
            >
                <img className="w-12 rounded-full shadow-2xs shadow-cream" src={song.image} alt="" />
                {extendPlayer && (
                    <div className='flex xl:gap-5 max-sm:gap-3 md:gap-5 items-center'>
                        <div className='flex xl:flex-row max-sm:flex-col md:flex-col max-sm:gap-2 md:gap-2'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                                className="flex flex-col">
                                <p className="text-white xl:text-lg xl:w-96 max-sm:w-30 md:w-70 max-sm:line-clamp-1 md:line-clamp-1 max-sm:text-sm md:text-sm">{ProperTitle(song.title)}</p>
                                <span className='text-cream xl:text-sm max-sm:text-[12px] md:text-[12px]'>{song.artist}</span>
                            </motion.div>
                            <motion.div
                                className='flex items-center gap-3 text-white text-[12px]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                            >
                                <span className='xl:flex xl:text-nowrap max-sm:hidden md:hidden'>{ProperTime(currentTime)}</span>

                                <input
                                    className='cursor-pointer xl:w-full rangeSM md:w-3/4'
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                />
                                <span className='xl:flex xl:text-nowrap max-sm:hidden md:hidden'>{ProperTime(duration)}</span>
                            </motion.div>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                            onClick={(e) => {
                                e.stopPropagation()
                                onPlayHandle()
                            }} className='cursor-pointer text-white'>
                            {isPlaying ? <LuPause size={25} /> : <LuPlay size={25} />}
                        </motion.button>
                        <input
                            className="h-4 w-4 appearance-none bg-white checked:rounded-full checked:bg-green-300 transition-all duration-300 ease-in-out rounded-[3px]"
                            type='checkbox'
                            onChange={(e) => {
                                e.stopPropagation()
                                const isChecked = e.target.checked;

                                const songSet = {
                                    title: song.title,
                                    audio: song.audio,
                                    image: song.image
                                }

                                setSelectedSong((prev) => {
                                    if (isChecked) return [...prev, songSet];
                                    return prev.filter((s) => s.audio !== songSet.audio);
                                });
                            }}

                        />




                        {/*Hidden for Phone users*/}
                        <button
                            className='cursor-pointer xl:flex max-sm:hidden md:hidden'
                            onClick={(e) => {
                                e.stopPropagation()
                                VolumeUp()
                            }}>

                            <BiVolumeFull size={30} className='hover:text-cream' />
                        </button>
                        <button
                            className='cursor-pointer xl:flex max-sm:hidden md:hidden'
                            onClick={(e) => {
                                e.stopPropagation()
                                VolumeDown()
                            }}>
                            <BiVolumeLow size={30} className='hover:text-cream' />
                        </button>
                    </div>
                )}
                <audio ref={audioRef} autoPlay className='bg-white w-60' onTimeUpdate={handleUpdate} onLoadedMetadata={handleUpdate}></audio>
            </motion.figure>
        </AnimatePresence>
    )
}

export default Playbar;