import { Card, Col, Text, Spacer, Grid,Link,Divider } from "@nextui-org/react";
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
      <Card className="mx-3 p-3 threeDShadowLight" css={{borderRadius:"20px",minWidth:"350px",border:"none"}} >
        <Text b className="flex justify-center w-full uppercase py-2 border-b-[.5px] border-gray-500/50">{name.replace("-"," ")}&nbsp;{"rankings"}</Text>
          <Spacer y={.5}/> 
          {allData ? 
          allData?.map((a,i)=>{
            return (
              <>
            <Spacer y={.2}/> 
            <CaraousalInfo key={a?.name} allData={a} endpoint={name} index={i+1}/>
            {(i < 9) && <Spacer y={.2}/> }
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