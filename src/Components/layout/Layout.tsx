import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";
import type { selectedAlbums, selectedSongs } from "../../types";
import { useEffect, useState } from "react";
import Playbar from "../subComponents/Playbar";
import { LayoutContext } from "../../Constants/Context";
import Loader from "../subComponents/Animations/Loader";



const Layout = () => {
  const [selectedSongs, setSelectedSongs] = useState<selectedSongs[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<selectedAlbums[]>([])
  const [currentSong, setCurrentSong] = useState<selectedSongs | null>(null);
  const [loading, setLoading] = useState(true)
  const [extend, setExtend] = useState(false)

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      },1000);
  }, [])

  
  if (loading) {
    return (
      <section className="h-[96.8svh] max-sm:min-w-0 w-full">
        <figure className="h-full flex justify-center items-center text-white">
          <Loader/>
        </figure>
      </section>
    )
  }
  return (
    <section className="w-full bg-background/95 flex flex-col">
      <LayoutContext.Provider value={{ extend, setExtend }}>
        <Navbar />
        <div className="flex">
          <aside className="">
            <Sidebar selectedSongs={selectedSongs} selectedAlbums={selectedAlbums} />
          </aside>
          <div className="w-full px-20 relative max-sm:px-3 md:px-15">
            <Outlet context={{ selectedSongs, setSelectedSongs, currentSong, setCurrentSong, selectedAlbums, setSelectedAlbums }} />
          </div>
        </div>
        {currentSong && (
          <Playbar
            song={currentSong}
            onEnd={() => {
              const CurntIndex = selectedSongs.findIndex(s => s.audio === currentSong.audio);
              const nextIndex = selectedSongs[CurntIndex + 1];
              if (nextIndex) {
                setCurrentSong(nextIndex);
              } else {
                setCurrentSong(null)
              }
            }}
            setSelectedSong={setSelectedSongs} />
        )}
      </LayoutContext.Provider>
    </section>
  )
}

export default Layout;