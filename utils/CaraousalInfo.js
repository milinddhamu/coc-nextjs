import { Card, Col, Text, Spacer, Row,Image,Badge } from "@nextui-org/react";
import { motion, animate, useMotionValue, useMotionTemplate } from "framer-motion";


const CaraousalInfo = ({name,image,}) => {
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };
  return (
    <>
    <Row align="center">
          <Col span={1}>
            <Text>1.</Text>
          </Col>
          <Col span={1}>
          <Image 
          src="https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png"
          alt="league"
          height={24}
          width={24}
          />
          </Col>
          <Col span={2}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-row justify-around items-center group">
              <div className='flex flex-row justify-center items-center relative'>
                <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={20} width={20} className='drop-shadow-md' alt="xp" />
                <div className='absolute text-white text-xs font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)] pb-1'>{245}</div>
              </div>
            </motion.div>
            </Col>
            <Col span={3}>
            <div className="flex flex-col">
              <Text b size={14}> Milind  ?? </Text>
              <Text color="warning" size={12}> Numereos </Text>
            </div>
            </Col>
            <Col span={4}>
            <div className="flex flex-col">
              <Text b size={10} className="flex flex-row"> Attacks Won - 045 </Text>
              <Text b size={10} className="flex flex-row"> Defense Won - 08 </Text>
            </div>
            </Col>
            <Col span={2}>
            <div className="flex flex-row items-center">
                      
                          <Image 
                          src='/assets/others/Trophy.png'
                          alt={"trophy"}
                          height={24}
                          width={24}
                          quality={30}
                          className="cursor-pointer transition-all ease-linear absolute z-40"
                                              />
                          <Spacer />
                          <Badge
                            size='md'
                            color="warning"
                            className="relative z-0"
                            variant="flat"
                            isSquared
                            css={{
                              minWidth: '20px',
                              border:"none",
                            }}
                          >
                            {5500}
                          </Badge>
                          </div>
            </Col>
            </Row>
        </>
  );
}

export default CaraousalInfo;