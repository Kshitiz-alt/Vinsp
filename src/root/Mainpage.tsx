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
      <div className="relative w-full flex-col -mt-10 md:px-4">
          <NewTracksSub />
          <Albums />
          <ArtistsSub/>
      </div>
    </section>
  )
}

export default Mainpage