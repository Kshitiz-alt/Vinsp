import { useEffect, useState } from "react";
import { ProperTitle, SEARCH, useQuery } from "../Constants/Fetch";;

import type { OutletContextType, SearchAlbumTypes, SearchArtistTypes, SearchTypes, selectedSongs } from "../types";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";


const SearchPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const query = useQuery().get('query') || "";
  const [searched, setSearched] = useState<SearchTypes[]>([]);
  const [albumState, setAlbumState] = useState<SearchAlbumTypes | null>(null);
  const [artistData, setArtistData] = useState<SearchArtistTypes | null>(null);
  const { setCurrentSong } = useOutletContext<OutletContextType>()

  const handlePlay = (song: SearchTypes) => {
    const selected: selectedSongs = {
      artist: song.artists?.all[0].name,
      title: song.title || song.name,
      audio: song.downloadUrl[4].url,
      id: song.id,
      image: song.image?.[2]?.url || ""
    };

    setCurrentSong(selected)
  }

  useEffect(() => {
    if (!query.trim()) {
      navigate('/')
    }
  }, [query, navigate]);

  useEffect(() => {
    if (!query.trim()) return
    const data = async () => {
      try {
        const { dataFetched, dataOfSongs } = await SEARCH(query)
        setSearched(dataOfSongs.results)
        setAlbumState(dataFetched.albums.results[0])
        setArtistData(dataFetched.artists.results[0])
        console.log(dataFetched.artists.results)
      } catch (error) {
        console.error('searched data not found', error)
      }
    }
    data()
  }, [query]);

  return (
    <section className="relative top-20 w-full h-[83.4vh] justify-center overflow-hidden bg-Gray/10 rounded-2xl">
      <h1 className="text-white text-2xl p-4">{t("searchquery")}<span className="text-cream px-3">{query}</span> </h1>
      <section className="flex pr-4 gap-30">
        <div className="w-1/2 flex flex-col items-center gap-3 py-1 px-5">
          {albumState && (
            <Link to={`/albums/${albumState.id}`} className="p-3 rounded-2xl flex gap-3  bg-Gray/10 hover:bg-HovBlue/10">
              <img className="max-w-1/3 rounded-2xl" src={albumState.image?.[2].url} alt="" />
              <div className="flex flex-col">
                <p className="text-white text-2xl">{albumState.title}</p>
                <span className="text-cream/70 text-sm ">{albumState.artist}</span>
              </div>
            </Link>
          )}
          {artistData && (
            <Link to={`/artists/${artistData.id}`} className="p-3 rounded-2xl flex gap-3 bg-Gray/10 hover:bg-HovBlue/10">
              <img className="max-w-1/3 rounded-2xl" src={artistData.image?.[2].url} alt="" />
              <div className="flex flex-col">
                <p className="text-white text-2xl">{artistData.title}</p>
                <span className="text-cream/70 text-sm">{artistData.description}</span>
              </div>

            </Link>
          )}
        </div>
        <aside className="w-1/2 space-y-4 overflow-y-scroll h-[72vh] bg-blend-color">
          {searched.map((element, index) => (
            <div className="flex justify-between bg-Gray/10 p-2 rounded-2xl hover:bg-cream/10 cursor-pointer" key={index} onClick={() => handlePlay(element)}>
              <figure className="flex gap-5">
                <img className="max-w-25 rounded-2xl" src={element.image?.[2].url} alt="" />
                <div className="flex flex-col w-96">
                  <figcaption className="text-white">{ProperTitle(element.name)}</figcaption>
                  <figcaption className="text-cream/70 text-sm">{element.artists?.all[0].name}</figcaption>
                </div>
              </figure>
              <span className="text-cream/70">{Math.ceil(element.duration / 60)} mins</span>
            </div>
          ))}
        </aside>
      </section>
    </section>
  )
}

export default SearchPage