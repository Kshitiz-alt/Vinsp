import NewTracksSub from "../Components/subPages/NewTracksSub"
import Carousel from "../Components/subComponents/Carousel"

const Mainpage = () => {
  return (
    <section className="">
      <div>
        <Carousel />
      </div>
      <aside className="absolute top-1/2 p-1">
        <NewTracksSub />
      </aside>
    </section>
  )
}

export default Mainpage