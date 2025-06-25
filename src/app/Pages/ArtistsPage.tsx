import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ARTISTS } from "../../Constants/Fetch"
import type { artistStateTypes } from "../../types"

const ArtistsPage = () => {
    const { id } = useParams<{ id: string }>()
    const [artistState, setArtistState] = useState<artistStateTypes[]>([])

    useEffect(() => {
        const artistData = async () => {
            if (!id) return;
            const data  = await ARTISTS(id)
            console.log(data?.artistSongs.songs)
            setArtistState(data?.artistSongs.songs)

        }
        artistData()
    }, [id])
    return (
        <section className="w-full h-full relative top-15 p-5">
            
            {artistState.map((element,index)=>(
                <div key={index} className="flex">
                    <figure>
                        <figcaption className="text-white">{element.name}</figcaption>
                        <figcaption className="text-white">{element.language}</figcaption>
                    </figure>
                    <span className="text-white">{Math.ceil(element.duration / 60)}min</span>

                </div>
            ))}
        </section>
    )
}

export default ArtistsPage