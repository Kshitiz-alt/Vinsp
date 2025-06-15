import { useState } from "react"
import { useTranslation } from "react-i18next";
import { BiDownload, BiLibrary } from "react-icons/bi";
import { LuLibrary } from "react-icons/lu"
import type { selectedSongs } from "../../..";
import Download from "../../../Constants/CustomDL";

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
    <section className={`fixed z-10 bg-gray-500/10 rounded-r-2xl  h-10/12 overflow-y-auto Scroll transition-all ease-in-out ${extend ? "px-10 w-96   bg-gray-900/95 " : "justify-center"}`}>
      <div className="cursor-pointer py-2" onClick={() => setExtend(!extend)}>
        <figure className="text-white flex gap-2 justify-center text-center hover:bg-purple-500/20 p-1 px-2 rounded-2xl transition-all ease-in-out">
          {extend ? <BiLibrary size={30} /> : <LuLibrary size={30} />}
          {extend && <figcaption className="truncate text-[20px]">{t('library')}</figcaption>}
        </figure>
        {extend && <BiDownload className="text-red-300 hover:bg-purple-500/20 p-1 rounded-2xl" size={40} onClick={downloadHandle} />}

      </div>
      {extend &&
        <div className="px-2 py-10">
          {selectedSongs.map((song, index) => (
            <div className="flex gap-5 space-y-5" key={index}>
              <img className="w-1/4" src={song.image} alt="" />
              <span className="text-red-300">{song.title}</span>
            </div>
          ))}
        </div>}
    </section>
  )
}

export default Sidebar