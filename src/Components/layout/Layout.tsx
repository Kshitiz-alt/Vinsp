import { Outlet } from "react-router-dom"

import Sidebar from "./Layouts/Sidebar"
import Navbar from "./Layouts/Navbar"
import type { selectedSongs } from "../../types"
import { useState } from "react"

const Layout = () => {

  const [selectedSongs, setSelectedSongs] = useState<selectedSongs[]>([])
  return (
    <section className="w-full min-h-screen bg-background/95 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="">
          <Sidebar selectedSongs={selectedSongs} />
        </aside>
        <div className="w-full px-20 relative overflow-y-scroll max-sm:px-2">
          <Outlet context={{ selectedSongs, setSelectedSongs }} />
        </div>
      </div>
    </section>
  )
}

export default Layout