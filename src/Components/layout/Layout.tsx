import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";
import type { selectedAlbums, selectedSongs } from "../../types";
import { useEffect, useState } from "react";
import Playbar from "../subComponents/Playbar";
import { LayoutContext } from "../../Constants/Context";
import Loader from "../subComponents/Animations/Loader";
import Lyrics from "./Layouts/Lyrics";
import { AnimatePresence } from "framer-motion";



const Layout = () => {
  const [selectedSongs, setSelectedSongs] = useState<selectedSongs[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<selectedAlbums[]>([])
  const [currentSong, setCurrentSong] = useState<selectedSongs | null>(null);
  const [showDetails,setDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [extend, setExtend] = useState(false)

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      },3000);
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
            <Sidebar selectedSongs={selectedSongs} selectedAlbums={selectedAlbums} />
          <div className={`px-20 relative max-sm:px-3 md:px-15 ${showDetails ? "w-[84%]":"w-full"}`}>
            <Outlet context={{ selectedSongs, setSelectedSongs, currentSong, setCurrentSong, selectedAlbums, setSelectedAlbums }} />
          </div>
          {showDetails && (
            <AnimatePresence mode="wait" >
              <Lyrics currentSong={currentSong} showDetails={showDetails} setDetails={setDetails}/>
            </AnimatePresence>
          )}
        </div>
        {currentSong && (
          <Playbar
            song={currentSong}
            setSelectedSong={setSelectedSongs} 
            showDetails={showDetails}
            setDetails={setDetails}
            onEnd={() => {
              const CurntIndex = selectedSongs.findIndex(s => s.audio === currentSong.audio);
              const nextIndex = selectedSongs[CurntIndex + 1];
              if (nextIndex) {
                setCurrentSong(nextIndex);
                setDetails(true)
              } else {
                setCurrentSong(null)
                setDetails(false)
              }
            }}
            />
        )}
      </LayoutContext.Provider>
    </section>
  )
}

export default Layout;