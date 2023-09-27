import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import CaraousalCard from "@/utils/CaraousalCard"
import { Text } from "@nextui-org/react"

const IndexCaraousal = ({data}) => {
  const animation = { duration:15000, easing: (t) => t };
  const [sliderRef] = useKeenSlider({
    mode: "snap",
    loop: true,
    renderMode:"performance",
    breakpoints: {
      "(min-width: 800px)": {
        slides: { perView: 2},
      },
      "(min-width: 1150px)": {
        slides: { perView: 3},
      },
    },
    slides: {
      perView: 1,
      spacing: 30,
    },
    created(s) {
      s.moveToIdx(3, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 3, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 3, true, animation)
    }
  })

  return (
    <div ref={sliderRef} className="keen-slider bg-violet-400/30">
      <div className="keen-slider__slide flex flex-col justify-center items-start p-8"> <Text weight="extrabold" size={84}  >Indian Rankings</Text>
      <Text weight="normal" size={26}>Swipe to see..</Text></div>
      <div className="keen-slider__slide py-12 px-6"><CaraousalCard data={data?.players} name={"Player Rankings"}/></div>
       <div className="keen-slider__slide py-12 px-6"><CaraousalCard data={data?.clans} name={"Clan Rankings"}/></div> 
      <div className="keen-slider__slide  py-12 px-6"><CaraousalCard data={data['clans-versus']} name={"Clan Rankings Versus"}/></div>
      <div className="keen-slider__slide py-12 px-6"><CaraousalCard data={data['players-versus']} name={"Player Rankings Versus"}/></div>
      <div className="keen-slider__slide py-12 px-6"><CaraousalCard data={data?.capitals} name={"Clan Capital Rankings"} /></div>
    </div>
  )
}

export default IndexCaraousal
