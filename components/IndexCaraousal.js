import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CaraousalCard from "@/utils/CaraousalCard";
import { Text } from "@nextui-org/react";
import {useState} from 'react';
const IndexCaraousal = ({ data }) => {
  const [sliderRef] = useKeenSlider({
    mode: "snap",
    loop: true,
    renderMode: "performance",
    breakpoints: {
      "(min-width: 800px)": {
        slides: { perView: 2 },
      },
      "(min-width: 1150px)": {
        slides: { perView: 3 },
      },
    },
    slides: {
      perView: 1,
      spacing: 30,
    },
  });
  const entries = Object.entries(data);  
  return (
    <div ref={sliderRef} className="keen-slider bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-violet-500/0">
      <div className="keen-slider__slide flex flex-col justify-start items-start p-12 sm:p-24">
        <Text weight="extrabold" size={72} css={{ lineHeight: "1.25" }}>
          INDIAN RANKINGS
        </Text>
        <Text weight="normal" size={26}>
          Players & Clan Rankings &#127942;
        </Text>
        <Text weight="normal" size={24}>Swipe to see..</Text>
      </div>
      {entries.map(([key, item], index) => (
        <div key={key} className="keen-slider__slide py-6 sm:py-12 px-6">
          <CaraousalCard data={item} name={key} />
        </div>
      ))}
    </div>
  );
};

export default IndexCaraousal;


