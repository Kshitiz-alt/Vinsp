
import { useEffect, useMemo, useRef, useState } from "react"
import type { AlbumItenary } from "../../types"
import { ProperTime, ProperTitle } from "../../Constants/Fetch"




const PlaylistItem = ({ S_no, duration, artist, onSelect,lyrics, title, audio, image, isCurrent, onAudioPlay }: AlbumItenary) => {

    const hoverRef = useRef(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    const [hover, setHover] = useState(false)
    const [isPlaying, setPlaying] = useState(false)

    const handleWithAudio = () => {
        const data = audioRef.current
        if (!data) return
        if (data?.paused) {
            onAudioPlay(data)
            setPlaying(true)
        } else {
            data.pause()
            setPlaying(false)
        }
    }
    const ChangedTitle = useMemo(() => ProperTitle(title), [title])

    useEffect(() => {
        if (!isCurrent && isPlaying) {
            const data = audioRef.current
            if (data) {
                data.pause()
                setPlaying(false)
            }
        }
    }, [isCurrent, isPlaying])


    return (
        <>
            <div
                ref={hoverRef}
                className={`relative hover:bg-cream focus-within:bg-cream/10 border border-cream rounded-2xl transition-all duration-150 ease-in-out cursor-pointer backdrop-blur-[30px] flex items-center justify-between gap-4 p-3 max-sm:p-2 max-sm:gap-2 max-sm:text-[10px] xl:w-full md:w-[126%] ${isCurrent ? "bg-cream/90 border-[2px] border-white" : ""
                    }`}
                onClick={() => handleWithAudio()}
            >
                <div className="flex items-center gap-3 max-sm:gap-2">
                    <span className={`text-cream md:text-sm ${isCurrent ? "text-white" : ""}`}>
                        {S_no}
                    </span>
                    <img
                        className="w-10 h-10 rounded-full object-cover max-sm:w-7 max-sm:h-7"
                        src={image}
                        alt=""
                    />
                </div>
                <div className="flex w-full px-5 justify-between  overflow-hidden">
                    <p
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={`text-white transition-all duration-300 ease-in-out text-ellipsis overflow-hidden ${hover ? "whitespace-normal line-clamp-4" : "whitespace-nowrap line-clamp-1"
                            } max-sm:text-[11px] md:text-[13px] xl:text-[15px]`}
                    >
                        {ChangedTitle}
                    </p>
                    <span className="text-white text-nowrap max-sm:text-[9px] md:text-[12px] xl:text-sm">
                        {artist}
                    </span>
                </div>

                <div className="flex items-center gap-3 justify-end w-1/3 max-sm:gap-2">
                    <span
                        className={`text-white text-sm max-sm:text-[9px] ${isCurrent ? "text-white" : ""
                            }`}
                    >
                        {ProperTime(duration)} mins
                    </span>
                    <input
                        className="h-4 w-4 shrink-0 self-center appearance-none bg-white checked:bg-green-300 checked:rounded-full rounded-[3px]"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onSelect?.({ title, audio, image, lyrics }, e.target.checked)}
                    />
                </div>

                <audio ref={audioRef} hidden src={audio}></audio>
            </div>
        </>
    )
}

export default PlaylistItem;

