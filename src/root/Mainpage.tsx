import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Animations/Carousel"
import Albums from "../Components/subPages/Albums"
import ArtistsSub from "../Components/subPages/ArtistsSub"
import { useEffect, useRef, useState } from "react"
import type { albumsTypes, artistTypes, Songtypes } from "../types"
import { ALBUMS, ARTISTS, SONGS } from "../Constants/Fetch"


const Mainpage = () => {

  const page = useRef<HTMLDivElement>(null)
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const [albums, setAlbums] = useState<albumsTypes[]>([])
  const [artist, setArtist] = useState<artistTypes[]>([])

  useEffect(() => {
    const setHeight = () => {
      if (page.current) {
        page.current.style.height = `${window.innerHeight}px`
      }
    }
    setHeight();
    window.addEventListener("resize", setHeight)
    return () => window.removeEventListener("resize", setHeight)

  }, [])

  useEffect(() => {
    const ids = ["1007", "1002", "1008", "1004", "1005"];
    const idOfArtists = ["10001", "10002", "10003", "10004", "10006"];

    const fetchData = async () => {
      try {
        const res = await SONGS("ad", 5);
        if (res) {
          setPlaylists(res)
        }

        const albumResponse = await Promise.all(
          ids.map(id => ALBUMS(Number(id)))
        )
        const validRes = albumResponse
          .filter(album => album?.album)
          .map(album => (
            {
              id: album.album.id,
              title: album.album.title,
              image: album.album.image,
            }
          ));
        setAlbums(validRes);

        const artistResponse = await Promise.all(
          idOfArtists.map(id => ARTISTS(Number(id)))
        )
        console.log("artistres", artistResponse)
        setArtist(artistResponse)
      } catch (err) {
        console.error(err)
      } 
    }
    fetchData()
  }, [])

  return (
    <section ref={page} className="h-[96.8svh] max-sm:min-w-0 w-full">
      <Carousel />
      <div className="relative w-full flex-col -mt-10 md:px-4">
        <NewTracksSub playlists={playlists} />
        <Albums albums={albums} />
        <ArtistsSub artist={artist} />
      </div>
    </section>
  )
}

export default Mainpage