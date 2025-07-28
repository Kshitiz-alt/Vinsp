import { useTranslation } from "react-i18next";
import { BiDownload, BiLibrary } from "react-icons/bi";
import { LuLibrary } from "react-icons/lu"
import type { selectedAlbums, selectedSongs } from "../../../types";
import Download from "../../../Constants/CustomDL";
import { ProperTitle } from "../../../Constants/Fetch";
import { useLayoutContext } from "../../../Constants/Context";
import { Link } from "react-router-dom";

type siderbarProps = {
  selectedSongs: selectedSongs[];
  selectedAlbums: selectedAlbums[]
}

const Sidebar = ({ selectedSongs , selectedAlbums}: siderbarProps) => {
  const { t } = useTranslation()
  const { extend,setExtend} = useLayoutContext()
  
  console.log("Selected Songs in Sidebar:", selectedSongs)
  
  const downloadHandle = () => {
    Download(selectedSongs)
  }

  return (
    <section className={`fixed top-20 z-30 bg-gray-500/10 rounded-r-2xl  h-10/12 transition-all ease-in-out max-sm:hidden  ${extend ? "px-10 xl:w-3/12 backdrop-blur-[5px] bg-gray-900/95 md:w-5/12 " : "justify-center"}`}>
      <div className="cursor-pointer py-2" onClick={() => setExtend(!extend)}>
        <figure className={`text-white flex gap-2 justify-center text-center  px-2 rounded-2xl transition-all ease-in-out ${!extend ? "flex-col":"flex-row"}`}>
          {extend ? <BiLibrary size={30}/> : <LuLibrary size={40} className="hover:bg-purple-500/20 rounded-2xl p-1" />}
          {extend && <figcaption className="truncate text-[20px] hover:bg-purple-500/20 p-1 rounded-sm">{t('library')}</figcaption>}
          {extend ? <BiDownload className="text-red-300 hover:bg-cream/20 p-1 rounded-2xl" size={40} onClick={downloadHandle}/> : <BiDownload className="text-red-300 hover:bg-cream/20 p-1 rounded-2xl" size={40} onClick={downloadHandle}/>}
        </figure>
        

      </div>
      {extend &&
        <div className="py-10 flex flex-col gap-2 overflow-y-scroll h-[calc(100%-80px)] Scroll">
          {selectedSongs.map((song, index) => (
            <div className="flex gap-5 space-y-5 hover:bg-cream/10 p-1 hover:rounded-2xl" key={index}>
              <img className="w-1/4 h-20 rounded-2xl object-center object-cover" src={song.image} alt="" />
              <span className="text-red-300">{ProperTitle(song.title)}</span>
            </div>
          ))}
          {selectedAlbums.map((albums)=>(
            <Link to={`/albums/${albums.id}`} key={albums.id} className="flex gap-4 hover:bg-cream/10 rounded-full duration-200 p-1">
              <img className="w-20 h-20 object-center object-cover rounded-full" src={albums.image} alt="" />
              <span className="text-white">{albums.title}</span>
            </Link>
          ))}
        </div>}
    </section>
  )
}

export default Sidebar