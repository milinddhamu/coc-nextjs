import CompareProgress from "@/utils/CompareProgress";
import ProfileProgress from "@/utils/ProfileProgress"
import { Card, Progress, Text, Spacer } from "@nextui-org/react";
import Image from "next/image";
import { townHall, builderHall } from '@/utils/Data/TownHallData';
import { GoArrowSwitch } from "react-icons/go";

import { motion, animate,useMotionValue, useMotionTemplate } from "framer-motion";

const CompareMainComponent = ({ playerOneData, playerTwoData }) => {
  const getImageSource = (playerData) => {
    const townHallDefense = townHall[playerData.townHallLevel]?.townhallweaponlevel[playerData.townHallWeaponLevel]?.url;
    const townHallStorage = townHall[playerData.townHallLevel]?.url;
    const thImage = (playerData.townHallLevel > 11) ? townHallDefense : townHallStorage;
    const bhImage = builderHall[playerData.builderHallLevel].url;

    return { thImage, bhImage };
  };

  const { thImage: thImagePlayerOne, bhImage: bhImagePlayerOne } = getImageSource(playerOneData);
  const { thImage: thImagePlayerTwo, bhImage: bhImagePlayerTwo } = getImageSource(playerTwoData);

  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };

  return (
    <>
    <div className="flex flex-col w-full justify-center items-center gap-6 mt-8">
      <div className="flex flex-row gap-12 w-full justify-center">
        <div>
          <div className="flex flex-row-reverse justify-start items-center gap-4">
          <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-row justify-around items-center group mt-1">
                    <div className='flex flex-row justify-center items-center relative'>
                      <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                      <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={32} width={32} className='mt-1 drop-shadow-md' alt="xp" />
                      <div className='absolute text-white text-xl font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]'>{playerTwoData.expLevel || 0}</div>
                    </div>
                  </motion.div>
        
          <Text b className="pt-1" size={18}>{playerOneData.name}</Text> 
          </div>               
          <div className="flex flex-col md:flex-row gap-4">
          <Image src={bhImagePlayerOne} height={120} width={120} alt="BuilderHall 1" />
          <Image src={thImagePlayerOne} height={120} width={120} alt="TownHall 1" />
          </div>
        </div>
        <div className="text-xl flex justify-center items-center "><GoArrowSwitch /></div>
        <div>
        <div className="flex flex-row justify-start items-center gap-4">
        <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-row justify-around items-center group mt-1">
                    <div className='flex flex-row justify-center items-center relative'>
                      <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                      <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={32} width={32} className='mt-1 drop-shadow-md' alt="xp" />
                      <div className='absolute text-white text-xl font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]'>{playerTwoData.expLevel || 0}</div>
                    </div>
                  </motion.div>
          <Text b className="pt-1" size={18}>{playerOneData.name}</Text> 
          </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Image src={thImagePlayerTwo} height={120} width={120} alt="TownHall 2" />
          <Image src={bhImagePlayerTwo} height={120} width={120} alt="BuilderHall 2" />
        </div>
        </div>
      </div>
      <CompareProgress playerOneData={playerOneData} playerTwoData={playerTwoData} />
    </div>
    </>
  );
}

export default CompareMainComponent;