import { Outlet } from "react-router-dom"

import Sidebar from "./Layouts/Sidebar"
import Navbar from "./Layouts/Navbar"
import type { selectedSongs } from "../../types"
import { useState } from "react"

const Layout = () => {

  const [selectedSongs, setSelectedSongs] = useState<selectedSongs[]>([])
  return (
    <section className="w-full min-h-[200vh] relative bg-background/95">
      <Navbar />
      <div className="flex py-19">
        <aside className="">
          <Sidebar selectedSongs={selectedSongs} />
        </aside>
        <div className="w-full px-20 ">
          <Outlet context={{ selectedSongs, setSelectedSongs }} />
        </div>
      </div>
    </section>
  )
}

export default Layout