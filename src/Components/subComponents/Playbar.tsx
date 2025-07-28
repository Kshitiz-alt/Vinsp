
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import type { PlayProps } from "../../types";
import { ProperTime, ProperTitle } from '../../Constants/Fetch';
import { useLayoutContext } from '../../Constants/Context';
import { LuMicVocal, LuPause, LuPlay } from 'react-icons/lu';
import { BiVolumeFull, BiVolumeLow } from 'react-icons/bi';
import { useIsMobile } from '../../Constants/useIsMobile';






const Playbar = ({ song, onEnd, setSelectedSong, showDetails, setDetails }: PlayProps) => {

    //State handling
    const audioRef = useRef<HTMLAudioElement>(null);
    const [extended, toggleExtend] = useCycle(false, true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [volume, setVolume] = useState(100)


    //Child component handling
    const { extend } = useLayoutContext();

    //For modbile & 640px devices
    const extendForMobile = useIsMobile()


    // Mounts when the player extends - fallback
    useEffect(() => {
        if (extended) {
            const timeOut = setTimeout(() => {
                toggleExtend()
            }, 20000)
            return () => clearTimeout(timeOut)
        }
    }, [extended, song, toggleExtend]);


    //Fetching data through audioRef for Audio data
    useEffect(() => {
        const audio = audioRef.current;
        try {

            if (audio && song.audio) {
                audio.src = song.audio;
                setDuration(0);
                setCurrentTime(0);
                setPlaying(false);

                audio.play().then(() => {
                    setPlaying(true);
                }).catch((err) => {
                    console.warn("audioRef:", err)
                })
            }

            return () => {
                if (audio) {
                    audio.pause()
                }
            }
        } catch (err) {
            console.error("playbar Error:", err)
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
    };

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

    const percentToVolume = (percent: number) => percent / 100;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = percentToVolume(volume)
        }
    }, [volume]);

    const VolumeUp = () => {
        const percentage = Math.min(volume + 10, 100);
        console.log(percentage, "volUp")
        setVolume(percentage)
    };
    const VolumeDown = () => {
        const percentage = Math.max(volume - 10, 0);
        console.log(percentage, "volDown")
        setVolume(percentage)
    };

    return (
        <AnimatePresence>
            <motion.figure
                key="playbar"
                onClick={() => toggleExtend()}
                initial={false}
                animate={extended ? "expanded" : "collapsed"}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, type: "spring" }}
                variants={{
                    collapsed: {
                        width: "72px",
                        borderRadius: "9999px",
                    },
                    expanded: {
                        width: "60%",
                    }
                }}
                className={`fixed z-40 bg-Gray/50 backdrop-blur-2xl inset-shadow-2xs inset-shadow-cream h-18 p-3 rounded-full flex items-center gap-2 transition-all duration-200 ease-in-out
                     ${extended ? " cursor-default max-sm:min-w-11/12 md:w-8/12 xl:w-full" : "w-18 max-sm:min-w-11/12 max-sm:h-16 cursor-pointer"}
                      ${extend ? "bottom-10 right-20" : "bottom-10 xl:left-20 max-sm:left-3 md:left-5"}
                    `}

            >
                <img className="w-12 h-12 rounded-full object-center object-cover shadow-2xs shadow-cream" src={song.image} alt="" />



                {(extended || extendForMobile) && (
                    <div className='flex justify-between items-center xl:gap-5 max-sm:justify-between md:gap-5'>
                        <div className='flex xl:flex-row max-sm:flex-col md:flex-col max-sm:gap-2 md:gap-2'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                                className="flex flex-col">
                                <p className="text-white xl:text-lg xl:w-96 max-sm:w-30 md:w-70 max-sm:line-clamp-1 md:line-clamp-1 max-sm:text-sm md:text-sm">{ProperTitle(song.title)}</p>
                                <span className='text-cream xl:text-sm max-sm:text-[10px] md:text-[12px]'>{song.artist}</span>
                            </motion.div>
                            <motion.div
                                className='flex items-center gap-3 text-white text-[12px]'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                            >
                                <span className='xl:flex xl:text-nowrap max-sm:text-nowrap max-sm:text-[9px] md:hidden'>{ProperTime(currentTime)}</span>

                                <input
                                    className='cursor-pointer max-sm:w-3/4 xl:w-full rangeSM md:w-3/4'
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                />
                                <span className='xl:flex xl:text-nowrap max-sm:text-nowrap max-sm:text-[9px]  md:hidden'>{ProperTime(duration)}</span>
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
                            }}
                            className='cursor-pointer text-white max-sm:px-2'>
                            {isPlaying ? <LuPause size={25} /> : <LuPlay size={25} />}
                        </motion.button>
                        <input
                            className="h-4 w-4 appearance-none bg-white checked:rounded-full checked:bg-green-300 transition-all duration-300 ease-in-out rounded-[3px] max-sm:hidden"
                            type='checkbox'
                            onChange={(e) => {
                                e.stopPropagation()
                                const isChecked = e.target.checked;

                                const songSet = {
                                    title: song.title,
                                    audio: song.audio,
                                    image: song.image,
                                    lyrics: song.lyrics
                                }
                                setSelectedSong((prev) => {
                                    if (isChecked) return [...prev, songSet];
                                    return prev.filter((s) => s.audio !== songSet.audio);
                                });
                            }}

                        />

                        <figure
                            onClick={(e) => {
                                e.stopPropagation();
                                setDetails(!showDetails)
                            }}
                            className='text-white hover:text-cream cursor-pointer max-sm:hidden md:hidden xl:block'>
                            <LuMicVocal size={25} />
                        </figure>




                        {/*Hidden for Phone users*/}
                        <aside className='flex gap-2'>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    VolumeUp();
                                }}
                                className="text-white cursor-pointer hover:text-cream max-sm:hidden md:hidden xl:flex"
                                disabled={volume >= 100}
                            >
                                <BiVolumeFull size={25} />
                            </button>
                            <span className='text-sm w-8 self-center text-cream max-sm:hidden md:hidden xl:flex'>{volume}%</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    VolumeDown();
                                }}
                                className="text-white cursor-pointer     hover:text-cream max-sm:hidden md:hidden xl:flex"
                                disabled={volume <= 0}
                            >
                                <BiVolumeLow size={25} />
                            </button>
                        </aside>
                    </div>
                )}

                <audio ref={audioRef} className='bg-white w-60' onTimeUpdate={handleUpdate} onLoadedMetadata={handleUpdate}></audio>
            </motion.figure>
        </AnimatePresence >
    )
}

export default Playbar;