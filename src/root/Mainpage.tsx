import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Animations/Carousel"
import Albums from "../Components/subPages/Albums"
import ArtistsSub from "../Components/subPages/ArtistsSub"
import { useEffect, useRef } from "react"

const Mainpage = () => {

  const page = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const setHeight = () => {
      if(page.current){
        page.current.style.height = `${window.innerHeight}px`
      }
    }
    setHeight();
    window.addEventListener("resize",setHeight)
    return () => window.removeEventListener("resize",setHeight)

  },[])
  return (
    <section ref={page} className="h-[96.8svh] max-sm:min-w-0 w-full">
      <Carousel />
      <div className="absolute flex-col top-1/2 p-1 w-11/12 md:px-4">
          <NewTracksSub />
          <Albums />
          <ArtistsSub/>
      </div>
    </section>
  )
}

export default Mainpage