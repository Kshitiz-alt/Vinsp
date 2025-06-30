
import { useEffect, useMemo, useRef, useState } from "react"
import type { AlbumItenary } from "../../types"
import Artist from "./Animations/Artist"
import { LuMicVocal } from "react-icons/lu"
import { ProperTime, ProperTitle } from "../../Constants/Fetch"

const AlbumItem = ({ duration, artists, onSelect, title, audio, image, isCurrent,  onAudioPlay }: AlbumItenary) => {

    const hoverRef = useRef(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    const [hover, setHover] = useState(false)
    const [isPlaying, setPlaying] = useState(false)

    const handleWithAudio = () => {
        const data = audioRef.current
        if (!data) return
        if (data?.paused) {
            onAudioPlay(data)
            data.play()
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
                <div ref={hoverRef} className="p-3  hover:bg-cream border overflow-hidden border-cream rounded-2xl transition-all duration-150 ease-in-out cursor-pointer flex gap-5 max-sm:gap-0 max-sm:text-[10px]" onClick={() => handleWithAudio()}>
                    <figure className="flex max-sm:flex-col gap-2">
                        <p
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            className={`text-white w-48 transition-all duration-300 ease-in-out max-sm:w-30 max-sm:line-clamp-1 max-sm:text-[11px] ${hover ? "line-clamp-3 max-h-17 max-sm:max-h-10" : "line-clamp-1 max-h-6 max-sm:max-h-3"}`}
                        >
                            {ChangedTitle}
                        </p>
                        <div className="flex">
                            <LuMicVocal size={20} className="max-sm:hidden" color="red" />
                            <Artist artists={artists} />
                        </div>
                    </figure>
                    <span className="max-sm:text-cream">{ProperTime(duration)} mins</span>
                    <input
                        className="h-4 w-4 mt-1 appearance-none bg-white checked:rounded-full checked:bg-green-300 transition-all duration-300 ease-in-out rounded-[3px]"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onSelect?.({ title, audio, image }, e.target.checked)} />
                    <audio ref={audioRef} hidden src={audio}></audio>
                </div>

        </>
    )
}

export default AlbumItem