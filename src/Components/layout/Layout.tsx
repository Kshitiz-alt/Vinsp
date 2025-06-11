import { Outlet } from "react-router-dom"

import Sidebar from "./Layouts/Sidebar"
import Navbar from "./Layouts/Navbar"

const Layout = () => {

  return (
    <section className="w-full min-h-screen relative bg-background/95">
      <Navbar/>
      <div className="flex py-19">
        <aside className="">
          <Sidebar />
        </aside>
        <div className="w-full px-20">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Layout