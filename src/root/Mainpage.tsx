import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Animations/Carousel"
import Albums from "../Components/subPages/Albums"
import ArtistsSub from "../Components/subPages/ArtistsSub"
import { useEffect, useRef, useState } from "react"
import type { albumsTypes, artistTypes, Songtypes } from "../types"
import { ALBUMS, ARTISTS, CAROUSEL, SONGS } from "../Constants/Fetch"
import Loader from "../Components/subComponents/Animations/Loader"


const Mainpage = () => {

  const page = useRef<HTMLDivElement>(null)
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const [albums, setAlbums] = useState<albumsTypes[]>([])
  const [artist, setArtist] = useState<artistTypes[]>([])
  const [carousel, setCarousel] = useState<Songtypes[]>([])

  const [loading, setLoading] = useState(true)
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
        setLoading(true)

        const idsInCarousel = ["1007", "1002", "1003", "1004", "1005", "1006", "1008", "1009", "1010", "1011"];
        const animatedAlbums = await Promise.all(
          idsInCarousel.map(id => CAROUSEL(Number(id)))
        )
        const formatted = animatedAlbums.map(result => result.rows?.[0]);
        console.log("these are songs?", animatedAlbums)
        setCarousel(formatted)
        const res = await SONGS("ad", 5, 1);
        if (res) {
          setPlaylists(res.result)
          console.log("data", res.result)
        }

        const albumResponse = await Promise.all(
          ids.map(id => ALBUMS(Number(id)))
        )
        const validRes = albumResponse
          .filter(album => album?.album?.rows?.length > 0)
          .map(album => {
            const rows = album.album.rows[0];
            return {
              id: rows.id,
              title: rows.title,
              image: rows.image,
            }
          });
        console.log("valid res", validRes)
        setAlbums(validRes);

        const artistResponse = await Promise.all(
          idOfArtists.map(id => ARTISTS(Number(id)))
        )
        const validArtists = artistResponse
          .filter(artist => artist?.rows?.length > 0)
          .map(artist => {
            const rows = artist.rows[0];
            return {
              id: rows.id,
              title: rows.title,
              image: rows.image,
            }
          });
        console.log("artistres", validArtists)
        setArtist(validArtists)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="h-[96.8svh] max-sm:min-w-0 w-full">
        <figure className="h-full flex justify-center items-center text-white">
          <Loader />
        </figure>
      </section>
    )
  }

  return (
    <section ref={page} className="h-[96.8svh] max-sm:min-w-0 w-full">
      <Carousel carousel={carousel}/>
      <div className="relative w-full flex-col -mt-10 md:px-4">
        <NewTracksSub playlists={playlists} />
        <Albums albums={albums} />
        <ArtistsSub artist={artist} />
      </div>
    </section>
  )
}

export default Mainpage