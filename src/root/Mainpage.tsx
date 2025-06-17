import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Animations/Carousel"
import Albums from "../Components/subPages/Albums"
import ArtistsSub from "../Components/subPages/ArtistsSub"

const Mainpage = () => {
  return (
    <section className="">
      <Carousel />
      <div className="absolute flex-col top-1/4 p-1">
          <NewTracksSub />
          <Albums />
          <ArtistsSub/>
      </div>
    </section>
  )
}

export default Mainpage