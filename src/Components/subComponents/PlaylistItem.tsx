
import { useEffect, useMemo, useRef, useState } from "react"
import type { AlbumItenary } from "../../types"
import { ProperTime, ProperTitle } from "../../Constants/Fetch"




const PlaylistItem = ({S_no, duration, artist, onSelect, title, audio, image, isCurrent, onAudioPlay }: AlbumItenary) => {

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
            <div ref={hoverRef} className={`hover:bg-cream focus-within:bg-cream/10 border overflow-hidden border-cream rounded-2xl transition-all duration-150 ease-in-out cursor-pointer backdrop-blur-[30px] flex gap-5 items-center max-sm:gap-2 max-sm:p-2 max-sm:text-[10px] md:w-[126%] md:p-1.5 xl:w-full xl:p-3 ${isCurrent ? "bg-cream/90 border-[2px] border-white" : ""}`} onClick={() => handleWithAudio()}>
                <figure className="flex max-sm:flex max-sm:gap-2 max-sm:w-2/3 md:gap-10">
                    <span className={`w-0 text-nowrap text-cream self-center md:text-sm xl:text-sm ${isCurrent ? "text-white" : ""}`}>{S_no}</span>
                    <img className="w-10 h-10 object-cover object-center absolute left-9 max-sm:w-7 max-sm:h-7 max-sm:left-5 max-sm:self-center md:w-10 md:self-center xl:self-center rounded-full" src={image} alt="" />
                    <aside className="px-13 max-sm:px-10 max-sm:flex-col max-sm:gap-2 md:px-10 xl:flex xl:gap-3">
                        <p
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            className={`text-white transition-all duration-300 ease-in-out max-sm:w-30 max-sm:line-clamp-1 max-sm:text-[11px] md:w-50 xl:w-48 ${hover ? "line-clamp-4 max-h-30 max-sm:max-h-13" : "line-clamp-1 max-h-6 max-sm:max-h-3"}`}
                        >
                            {ChangedTitle}
                        </p>
                        {/* <p className="text-white">{lyrics}</p> */}
                        <div className="flex gap-10">
                            {/* <LuMicVocal size={20} className="max-sm:hidden md:hidden" color="red" /> */}
                            {/* <Artist artists={artists} /> */}
                            <span className="text-white self-center w-58 max-sm:text-[9px] md:text-[12px] xl:text-sm">{artist}</span>
                        </div>
                    </aside>
                </figure>
                <span className={`absolute left-[42%] top-4 text-white text-nowrap max-sm:text-cream max-sm:left-4/5 max-sm:top-3.5 md:left-3/5 md:text-[12px] xl:text-foundation xl:w-3    /5 xl:text-sm ${isCurrent ? "max-sm:text-white" : ""}`}>{ProperTime(duration)} mins</span>
                <input
                    className="h-4 w-4 appearance-none bg-white checked:rounded-full checked:bg-green-300 transition-all duration-300 ease-in-out rounded-[3px]"
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => onSelect?.({ title, audio, image }, e.target.checked)} />
                <audio ref={audioRef} hidden src={audio}></audio>
            </div>

        </>
    )
}

export default PlaylistItem

