import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";
import type { selectedSongs } from "../../types";
import { useState } from "react";
import Playbar from "../subComponents/Playbar";
import { LayoutContext } from "../../Constants/Context";



const Layout = () => {
  const [selectedSongs, setSelectedSongs] = useState<selectedSongs[]>([]);
  const [currentSong, setCurrentSong] = useState<selectedSongs | null>(null);
  const [extend, setExtend] = useState(false)



  return (
    <section className="w-full bg-background/95 flex flex-col">
      <LayoutContext.Provider value={{ extend, setExtend }}>
        <Navbar />
        <div className="flex">
          <aside className="">
            <Sidebar selectedSongs={selectedSongs} />
          </aside>
          <div className="w-full px-20 relative max-sm:px-3 md:px-15">
            <Outlet context={{ selectedSongs, setSelectedSongs, setCurrentSong, currentSong }} />
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