import { useState } from "react"
import { BiLibrary } from "react-icons/bi";
import { LuLibrary } from "react-icons/lu"

const Sidebar = () => {
  const [extend, setExtend] = useState(false)

  return (
    <section className={`fixed z-10 bg-gray-500/10 rounded-r-2xl  h-screen  transition-all ease-in-out ${extend ? "px-10  bg-gray-900/95 " : "justify-center"}`}>
      <div className="cursor-pointer py-2" onClick={() => setExtend(!extend)}>
        <figure className="text-white flex justify-center hover:bg-purple-500/20 p-1 px-2 rounded-2xl transition-all ease-in-out">
          {extend ? <BiLibrary size={30} /> : <LuLibrary size={30} />}
          {extend && <figcaption className=" text-nowrap p-1">Your Library</figcaption>}
        </figure>
      </div>
    </section>
  )
}

export default Sidebar