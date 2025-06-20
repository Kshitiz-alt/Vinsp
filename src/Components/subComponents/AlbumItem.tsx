
import { useEffect, useMemo, useRef, useState } from "react"
import type { AlbumItenary } from "../../types"
import Artist from "./Animations/Artist"
import { LuMicVocal} from "react-icons/lu"
import { ProperTitle } from "../../Constants/Fetch"

const AlbumItem = ({ duration, artists, onSelect, title, audio, image, onAudioPlay, isCurrent }: AlbumItenary) => {

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
    const ChangedTitle = useMemo(()=> ProperTitle(title),[title])

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
            <div className="flex items-center gap-2">
                <div ref={hoverRef} className="p-3 w-2xl hover:bg-cream border overflow-hidden border-cream rounded-2xl transition-all duration-150 ease-in-out cursor-pointer flex justify-between max-sm:w-full max-sm:text-[10px]" onClick={() => handleWithAudio()}>
                    <p
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={`text-white w-60 transition-all duration-300 ease-in-out max-sm:text-[10px] ${hover ? "line-clamp-3 max-h-17 max-sm:max-h-10" : "line-clamp-1 max-h-6 max-sm:max-h-3"}`}
                    >
                        {ChangedTitle}
                    </p>
                    <div className="flex gap-2">
                        <LuMicVocal size={20} color="red" />
                        <Artist artists={artists} />
                    </div>
                    <span className="max-sm:text-cream">{Math.ceil(duration / 60)}mins</span>
                    <input
                        className="h-4 w-4 mt-1 appearance-none bg-white checked:rounded-full checked:bg-green-300 transition-all duration-300 ease-in-out rounded-[3px]"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => onSelect?.({ title, audio, image }, e.target.checked)} />
                    <audio ref={audioRef} hidden src={audio}></audio>
                </div>
            </div>
        </>
    )
}

export default AlbumItem