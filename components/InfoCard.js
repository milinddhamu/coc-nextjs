import React from 'react'
import { Card, Container, Text, Row, Col, User, Avatar, Button,Loading, Badge, Spacer, Grid, Tooltip } from '@nextui-org/react'
import Image from 'next/image';
import ProfileMainDetails from '@/utils/ProfileMainDetails';
import HomeVillageArmy from '@/utils/HomeVillageArmy';
import { useState, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import BuilderBaseArmy from '@/utils/BuilderBaseArmy'
import Achievements from '@/utils/Achievements';
import { animate } from "framer-motion";
import { useRef } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useRouter } from "next/router";
import { Gasoek_One } from "next/font/google";
import { Lilita_One } from "next/font/google"
import { IoLinkOutline } from "react-icons/io5";
import { townHall,builderHall } from '@/utils/Data/TownHallData';
import { IoRefresh } from "react-icons/io5";
import Comments from "./Comments";

const gasoekOne = Gasoek_One({weight: '400',
subsets: ['latin'],})
const lilitaOne = Lilita_One({weight: '400',
subsets: ['latin'],})

const InfoCard = ({ data }) => {
  
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  
  const clanData = (data?.clan.tag).slice(1)
  const handleSubmitClan = () => {
    (clanData) ? (router.push(`../clanData/${clanData}`, undefined, { shallow: true })) : (console.log('Please enter clan tag'))
  }
  const [isLoading, setLoading] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const townHallDefense = townHall[data.townHallLevel]?.townhallweaponlevel[data.townHallWeaponLevel]?.url
  const townHallStorage = townHall[data.townHallLevel]?.url
  const thImage = (data.townHallLevel > 11) ? townHallDefense : townHallStorage
  const bhImage = builderHall[data.builderHallLevel].url
  const [army, setArmy] = useState(true)
  const colorHelp = (army) ? 'bg-gradient-to-tr from-violet-600 via-purple-400/0 to-black/0 ' : 'saturate-0 transition-all ease-in duration-800'
  function Counter({ from, to }) {
    const nodeRef = useRef();

    useEffect(() => {
      const node = nodeRef.current;

      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          node.textContent = value.toFixed();
        }
      });

      return () => controls.stop();
    }, []);

    return <p className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold pt-1 drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]"
      ref={nodeRef} />;
  }
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };
  const textVariants2 = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0,transition: {
      duration: 1,
      ease: "easeOut", // Animation easing effect
    }, },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const springAnimation = {
    type: "spring",
    damping: 10,
    stiffness: 200,
    delay:0.5,
  };
  return (
        <>
        <Container css={{margin:"0px",padding:"0px"}} className="border-x-[.5px] border-gray-500/20 flex justify-center">
        <Card className='flex flex-col justify-center items-center border-none px-6 pb-5 md:px-8 max-w-5xl' css={{backgroundColor:"transparent",shadow:"none"}} >
          <span className='flex flex-col justify-center'>
            <div className=' flex flex-col justify-center items-center'>
              {/* put animated icon down here */}
              <div ref={parent} className='relative flex flex-row justify-center items-center w-full gap-2 md:gap-4 lg:gap-6 transition-all ease-in'>
                <Tooltip content={`Townhall - ${data.townHallLevel}.${data?.townHallWeaponLevel}`} color='secondary' placement="bottomStart"
                >
                  <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  transition={springAnimation}
                  aria-label="th image" className={`flex flex-row items-baseline cursor-pointer transition-all ease-linear pl-4 rounded-s-full  ${colorHelp}`}
                    onClick={() => setArmy(true)}
                  >
                    <Card.Image
                      src={thImage}
                      quality={30}
                      width="100%"
                      height="100%"
                      alt="Card image background 1"
                      className={`w-32 sm:w-36 lg:w-44 xlg:w-48 hover:translate-y-1 hover:saturate-105 transition-transform ease-inout duration-300
                    `}
                    />
                  </motion.div>
                </Tooltip>
                <Spacer />

                <Tooltip content={`Builderhall - ${data.builderHallLevel}`} color='warning'
                  placement='bottomEnd'
                >
                  <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  transition={springAnimation}
                  aria-label="bh image" className={`flex flex-row items-baseline cursor-pointer  transition-all ease-linear pr-3 py-2 rounded-e-full ${!army ? 'bg-gradient-to-tl from-orange-500 via-yellow-500/0 to-black/0' : 'saturate-0 transition-all ease-in duration-300'} `}
                    onClick={() => setArmy(false)}>
                    <Card.Image
                      src={bhImage}
                      width="100%"
                      quality={30}
                      height="100%"
                      alt="Card image background 2"
                      className={`w-32 sm:w-36 lg:w-44 xlg:w-48  hover:translate-y-1 transition-all ease-inout duration-300
                      `}
                    />
                  </motion.div>
                </Tooltip>
                <div className="absolute right-50 top-0 flex flex-col justify-center items-center">
                  <Tooltip auto color="success" hideArrow content="Refresh Data" placement="bottom">
                <Button auto flat className="bg-green-400/20 hover:bg-green-400/40 rounded-full scale-75 md:scale-100" color="success" onPress={refreshData}>
                  <IoRefresh />
                </Button>
                </Tooltip>
                </div>
              </div>
              <Spacer />
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants2}
                transition={{duration:0.5}}
                style={{ fontSize: '10px', fontWeight: '300' }}
              >
                CLICK ON IMAGE TO SHOW RELEVANT DETAILS
              </motion.div>
              <Spacer y={.5} />
              <Card.Divider />
              <Spacer />
              <div className='flex flex-col sm:flex-row gap-2 justify-between cursor-pointer items-center min-w-full'>
                <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex flex-row justify-around items-center group">
                  <div className='flex flex-row justify-center items-center relative'>
                  <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear"></div>
                  <Card.Image src='/assets/others/XP.png' className='h-14 pt-2 sm:h-16 md:h-18 lg:h-22 drop-shadow-xl' alt="xp" />
                  <div className='absolute'><Counter from={50} to={data.expLevel || 0} /></div>
                  </div>
                  <Spacer x={.5}/>
                  <Text
                  h1
                  className="flex flex-row bg-gradient-radial from-amber-100 via-amber-500 to-yellow-900 text-2xl md:text-3xl xlg:text-4xl animate-text bg-clip-text text-transparent antialiased drop-shadow-md p-1"
                  weight="extrabold"
                  >{data?.name || "Builder X"}
                  </Text>
                </motion.div>

                <motion.div 
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex flex-row justify-around items-center cursor-pointer group" onClick={handleSubmitClan}>
                  <div className="relative">
                    <div className="opacity-0 w-full h-full absolute bg-gradient-radial from-yellow-200 via-amber-200 to-sky-400 blur-xl scale-75 animate-text rounded-full group-hover:opacity-90 transition-all duration-800 ease-linear"></div>
                <Card.Image src={data.clan.badgeUrls.medium || "/assets/others/clanless.png"} className='relative h-12 sm:h-14 md:h-16 lg:h-18 drop-shadow-xl' alt="clan logo" />
                  </div>
                 <Text
                  h1
                  className="flex flex-row bg-gradient-radial from-slate-100 via-slate-500 to-slate-800 text-2xl md:text-3xl xlg:text-4xl  bg-clip-text text-transparent antialiased drop-shadow-md animate-text transition-all ease-linear p-1"
                  weight="extrabold"
                >{data.clan?.name|| "Clan X"}
                </Text>
                {data.clan?.name ? <IoLinkOutline className="mt-2 ml-2 scale-105 group-hover:-rotate-45
                group-hover:text-sky-400 transition-all duration-300"/> : <></>}
                
                </motion.div>

              </div>
              <Spacer y={.5} />
              

              <div className='flex flex-row items-center w-full' >
                <Grid.Container gap={2} className='justify-center items-center'>
                  {(data?.labels) ?
                  data?.labels.map((a, i) =>
                    <Grid key={a.name}>
                      <Tooltip content={a.name} color="invert" placement='bottom' hideArrow css={{borderRadius:"8px"}}>
                        <Avatar
                          borderWeight="light"
                          squared
                          zoomed
                          bordered
                          text={a.name || "null"}
                          variant="flat"
                          size={"lg"}
                          pointer
                          src={a.iconUrls.small || '/assets/others/noLabel.png'}
                        />
                      </Tooltip>
                    </Grid>) : <h1>No data Found</h1>
                    }
                </Grid.Container>
              </div>
            </div>
            <ProfileMainDetails data={data} />
            
            {(army) ?
              <div className='flex flex-col'>
                <div className="flex flex-row items-center">
              <Text h1
                size={17}
                className='bg-clip-text animate-text min-w-fit text-transparent p-2 bg-gradient-to-tl from-slate-300 to-slate-800 drop-shadow-lg text-aligni'
                weight="extrabold"
              >
                Home Village Army
              </Text>
              <Card.Divider className="flex mt-1" />
              </div>
                <HomeVillageArmy data={data} />

              </div> :
              <div className='flex flex-col'>
                <div className="flex flex-row items-center">
              <Text h1
                size={17}
                className='bg-clip-text animate-text min-w-fit text-transparent p-2 bg-gradient-to-tl from-slate-300 to-slate-800 px-2 drop-shadow-lg'
                weight="extrabold"
              >
                Builder Base Army
              </Text>
              <Card.Divider className="flex mt-1" />
              </div>
                <BuilderBaseArmy data={data} />
              </div>
            }
            <div className='flex flex-col'>
              <div className="flex flex-row items-center">
              <Text h1
                size={17}
                className='bg-clip-text animate-text text-transparent p-2 bg-gradient-to-tl from-slate-300 to-slate-800 px-2 drop-shadow-lg'
                weight="extrabold"
              >
                Achievements
              </Text>
              <Card.Divider className="flex mt-1" />
              </div>
              <Achievements data={data} />
            </div>
            <Spacer />
            <Card.Divider />
            <Spacer />
            <Comments playerTag={data.tag}/>
          </span>
        </Card>
        </Container>
        
    
    </>
  )
}

export default InfoCard