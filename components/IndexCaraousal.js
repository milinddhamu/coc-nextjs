import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import CaraousalCard from "@/utils/CaraousalCard"
import { Text } from "@nextui-org/react"
import axios from "axios";

const IndexCaraousal = ({data}) => {
  const [sliderRef] = useKeenSlider({
    mode: "snap",
    breakpoints: {
      "(min-width: 800px)": {
        slides: { perView: 2,origin: "center"},
      },
      "(min-width: 1150px)": {
        slides: { perView: 3,origin: "center" },
      },
    },
    slides: {
      perView: 1,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider bg-white/10">
      <div className="keen-slider__slide flex flex-col justify-center items-start p-20"> <Text weight="extrabold" size={84}  >Indian Rankings</Text>
      <Text weight="normal" size={26}>Swipe to see..</Text></div>
      <div className="keen-slider__slide p-5"><CaraousalCard data={data?.players} name={"Player Rankings"}/></div>
      {/* <div className="keen-slider__slide p-5"><CaraousalCard data={data.clans} name={"Clan Rankings"}/></div>
      <div className="keen-slider__slide  p-5"><CaraousalCard data={data['clans-versus']} name={"Clan Rankings Versus"}/></div>
      <div className="keen-slider__slide p-5"><CaraousalCard data={data['players-versus']} name={"Player Rankings Versus"}/></div>
      <div className="keen-slider__slide p-5"><CaraousalCard data={data.capitals} name={"Clan Capital Rankings"} /></div> */}
    </div>
  )
}

export default IndexCaraousal
