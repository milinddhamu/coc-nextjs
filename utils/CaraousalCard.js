import { Card, Col, Text, Spacer, Grid } from "@nextui-org/react";
import { motion, animate, useMotionValue, useMotionTemplate } from "framer-motion";
import CaraousalInfo from './CaraousalInfo'
import { useState,useEffect } from "react";
const CaraousalCard = ({data,name}) => {
  const [allData , setAllData] = useState([null])
  useEffect(()=>{
    setAllData(data?.items)
  },[])
  
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };

  return (
    <>
      <Card className="border-[.5px] border-gray-500/20 mx-3 p-3" css={{borderRadius:"8px",minWidth:"350px"}} >
        <Text b className="flex justify-center w-full border-b-[.5px] border-gray-500/20 pb-3">{name}</Text>
          <Spacer y={.5}/>
          {allData.map((a,i)=>{
            <h1 key={a?.tag || "-"}>{a?.name || "-"}</h1>
          })}
          
          </Card>
        </>
        );
}

        export default CaraousalCard;