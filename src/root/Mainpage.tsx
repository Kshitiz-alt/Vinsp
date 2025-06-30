import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Animations/Carousel"
import Albums from "../Components/subPages/Albums"
import ArtistsSub from "../Components/subPages/ArtistsSub"

const Mainpage = () => {
  return (
    <section className="h-[96.8svh] max-sm:w-screen">
      <Carousel />
      <div className="absolute flex-col top-1/2 p-1 min-w-10/12">
          <NewTracksSub />
          <Albums />
          <ArtistsSub/>
      </div>
    </section>
  )
}

export default Mainpage