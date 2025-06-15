import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Carousel"
import AlbumsSub from "../Components/subPages/AlbumsSub"
import ArtistsSub from "../Components/subPages/ArtistsSub"

const Mainpage = () => {
  return (
    <section className="">
      <Carousel />
      <div className="absolute flex-col top-1/4 p-1">
          <NewTracksSub />
          <AlbumsSub />
          <ArtistsSub/>
      </div>
    </section>
  )
}

export default Mainpage