import { useState } from "react"
import { useTranslation } from "react-i18next";
import { BiDownload, BiLibrary } from "react-icons/bi";
import { LuLibrary } from "react-icons/lu"
import type { selectedSongs } from "../../../types";
import Download from "../../../Constants/CustomDL";
import { ProperTitle } from "../../../Constants/Fetch";

type siderbarProps = {
  selectedSongs: selectedSongs[]
}

const Sidebar = ({ selectedSongs }: siderbarProps) => {
  const { t } = useTranslation()
  const [extend, setExtend] = useState(false)

  console.log("Selected Songs in Sidebar:", selectedSongs)

  const downloadHandle = () => {
    Download(selectedSongs)
  }
  return (
    <section className={`fixed top-20 z-30 bg-gray-500/10 rounded-r-2xl  h-10/12 overflow-y-auto Scroll transition-all ease-in-out max-sm:w-0  ${extend ? "px-10 w-3/12  bg-gray-900/95 " : "justify-center"}`}>
      <div className="cursor-pointer py-2" onClick={() => setExtend(!extend)}>
        <figure className={`text-white flex gap-2 justify-center text-center  px-2 rounded-2xl transition-all ease-in-out ${!extend ? "flex-col":"flex-row"}`}>
          {extend ? <BiLibrary size={30}/> : <LuLibrary size={40} className="hover:bg-purple-500/20 rounded-2xl p-1" />}
          {extend && <figcaption className="truncate text-[20px] hover:bg-purple-500/20 p-1 rounded-sm">{t('library')}</figcaption>}
          {extend ? <BiDownload className="text-red-300 hover:bg-cream/20 p-1 rounded-2xl" size={40} onClick={downloadHandle}/> : <BiDownload className="text-red-300 hover:bg-cream/20 p-1 rounded-2xl" size={40} onClick={downloadHandle}/>}
        </figure>
        

      </div>
      {extend &&
        <div className="px-2 py-10">
          {selectedSongs.map((song, index) => (
            <div className="flex gap-5 space-y-5 hover:bg-cream/10 p-1 hover:rounded-2xl" key={index}>
              <img className="w-1/4 rounded-2xl" src={song.image} alt="" />
              <span className="text-red-300">{ProperTitle(song.title)}</span>
            </div>
          ))}
        </div>}
    </section>
  )
}

export default Sidebar