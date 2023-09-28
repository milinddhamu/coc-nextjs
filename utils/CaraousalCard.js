import { Card, Col, Text, Spacer, Grid,Link } from "@nextui-org/react";
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
  console.log(data , name)
  return (
    <>
      <Card  className="border-[.5px] border-gray-500/20 mx-3 p-3" css={{borderRadius:"8px",minWidth:"350px",shadow:"none"}} >
        <Text b className="flex justify-center w-full border-b-[.5px] border-gray-500/20 pb-3">{name}</Text>
          <Spacer y={.5}/> 
          {allData ? 
          allData?.map((a,i)=>{
            return (
              <>
            <CaraousalInfo key={a?.name} allData={a} endpoint={name} index={i+1}/>
            </>
            )
          }) : <><div className="flex w-full items-center justify-center">
            <Spacer y={4} />
            <Text weight="semibold" size={14}>API not working...</Text>
            <Spacer />
            </div></> }
          </Card>
        </>
        );
}

        export default CaraousalCard;