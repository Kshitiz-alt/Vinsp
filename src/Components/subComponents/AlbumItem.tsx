
import { useRef } from "react"
import type { AlbumItenary } from "../../types"
import Artist from "./Animations/Artist"
import { LuMicVocal } from "react-icons/lu"

const AlbumItem = ({ duration, artists, onSelect, title, audio, image }: AlbumItenary) => {

    const audioRef = useRef<HTMLAudioElement>(null)

    const handleWithAudio = () => {
        const data = audioRef.current
        if (!data) return
        if (data?.paused) {
            data.play()
        } else {
            data.pause()
        }
    }
    return (
        <>
            <div className="p-3 w-2xl hover:bg-cream border border-cream rounded-2xl transition-all duration-150 ease-in-out cursor-pointer flex justify-between" onClick={() => handleWithAudio()}>
                <p className="text-white w-60">{title}</p>
                <div className="flex gap-2">
                    <LuMicVocal size={20} color="red"/>
                    <Artist artists={artists} />
                </div>
                <span>{Math.ceil(duration / 60)}mins</span>
                <input className="h-4 w-4 mt-1" type="checkbox" onChange={(e) => onSelect?.({ title, audio, image }, e.target.checked)} />
                <audio ref={audioRef} hidden src={audio}></audio>
            </div>
        </>
    )
}

export default AlbumItem