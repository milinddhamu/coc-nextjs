import { Text, Image,Dropdown,Spacer,Badge,Grid,Container,Input,Card,Row,Col } from "@nextui-org/react";
import { motion, animate,useMotionValue, useMotionTemplate } from "framer-motion";
import { TiEquals } from "react-icons/ti";
import { ChevronUp, ChevronDown, ChevronLeft } from "react-iconly"
import { useTheme } from '@nextui-org/react'

const Suggestions = ({data,clickHandle}) => {
  const { isDark } = useTheme();
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };
  function getRoleColor(role) {
    let colorCode;

    switch (role) {
      case 'leader':
        colorCode = 'error';
        break;
      case 'coLeader':
        colorCode = 'warning';
        break;
      case 'admin':
        colorCode = 'secondary';
        break;
      case 'member':
        colorCode = 'primary';
        break;
      default:
        colorCode = 'primary';
        break;
    }
    return colorCode;
  }
  const IconRank = () => {
    if (data?.clanRank > data?.previousClanRank) {
      return <ChevronDown set="bold" primaryColor="red" className="" />
    } else if (data?.clanRank < data?.previousClanRank) {
      return <ChevronUp set="bold" primaryColor="green" className="" />
    } else {
      return <Text color="neutral" className="scale-75"><TiEquals /></Text>
    }
  }
  const cardColor = isDark ? "#2B2F31" : "#ECEDEE"
  return (
    <>
    <Card isPressable onClick={()=>clickHandle(data?.name)} css={{borderRadius:"8px",height:"45px",border:"none","&:hover" : {background:cardColor}}}>
              <Row>
                <Col span={3}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-row justify-around items-center group mt-1">
                    <div className='flex flex-row justify-center items-center relative'>
                      <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                      <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={24} width={24} className='mt-1 drop-shadow-md' alt="xp" />
                      <text className='absolute font-extrabold text-white drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]'>{data?.expLevel || 0}</text>
                    </div>
                  </motion.div>
                </Col>
                <Spacer x={.5} />
                <Col>
                  <Text size={12} weight="extrabold" className="bg-clip-text bg-gradient-to-bl from-violet-600 to-yellow-300 text-transparent animate-text line-clamp-1">
                    {data?.name || "-"}
                  </Text>
                  <Text size={8} color={getRoleColor(data?.role)} className="uppercase much-letter-spacing">
                    {(data?.role === "admin") ? "Elder" : `${data?.role}` || "-"}
                  </Text>
                </Col>
              <Col span={2} justify="flex-end" align="center" css={{ padding: "7px 5px 5px 0px" }}>
                <div className="flex flex-row items-center border-[.5px] border-gray-500/30 rounded-[8px] p-1">
                  <Text size={10} weight="extrabold" className="text-center" b>
                    {data?.clanRank || "-"}
                  </Text>
                  {<IconRank /> || "-"}
                </div>
                </Col>
              </Row>
           
    </Card>
    </>
  );
}

export default Suggestions;