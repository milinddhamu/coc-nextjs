import { Text, Image, Card, Row, Button, Spacer, Col, Grid, Avatar, Badge, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft } from "react-iconly"
import { TiEquals } from "react-icons/ti";
import { useRouter } from "next/router";
import { motion, animate,useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { useTheme } from '@nextui-org/react'
import CopyToClipboard from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import { FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileProgress from "./ProfileProgress"
import { homeHeroes } from './Data/HomeArmyData';
import { townHall,builderHall } from '@/utils/Data/TownHallData';
import {useSetRecoilState ,useRecoilValue} from "recoil"
import { teamState } from "@/recoil/storage";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { MdOutlineAddModerator,MdOutlineDeleteOutline } from "react-icons/md";

const ClanList = ({data,buttonState}) => {
  const setTeam = useSetRecoilState(teamState);
  const teamList = useRecoilValue(teamState);
  const isPlayerAdded = (string,array) => array.includes(string);
  const isPlayerAlreadyAdded = isPlayerAdded(data?.tag, teamList);
  const townHallDefense = townHall[data.townHallLevel]?.townhallweaponlevel[data.townHallWeaponLevel]?.url
  const townHallStorage = townHall[data.townHallLevel]?.url
  const thImage = (data.townHallLevel > 11) ? townHallDefense : townHallStorage
  const bhImage = builderHall[data.builderHallLevel]?.url
  const { isDark } = useTheme();
  const copyButton = isDark ? "#0F1212" : "#9BA1A6";
  const teamButtonRemoveColor = isPlayerAlreadyAdded ? "#F3126080" : "#71717A";
  const teamButtonAddColor = isPlayerAlreadyAdded ? "#17C96480" : "#F31260";
  console.log(isPlayerAlreadyAdded)
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };
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

    return <p className="text-white text-xl font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]"
      ref={nodeRef} />;
  }

  const router = useRouter();
  const cwlStars = data?.achievements.find((item) => item.name === "War League Legend")?.value;

  function removeHashIfPresent(string) {
    if (string.startsWith("#")) {
      return string.substring(1);
    } else {
      return string;
    }
  }

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

  const playerInfo = removeHashIfPresent(data?.tag)

  const handleSubmitPlayer = () => {
    (playerInfo) ? (router.push(`../playerData/${playerInfo}`, undefined, { shallow: true })
    ) : (console.log('Please enter your tag'))
  };

  const handleAddPlayer = () => {
    if(teamList.includes(data?.tag)) return
    setTeam((prevPlayers)=> [
      ...prevPlayers,
      data?.tag
    ]);

  };
  const handleRemovePlayer = () => {
    setTeam((prevPlayers)=> 
      prevPlayers.filter((player)=>player !== data?.tag)
    );
  };

  const IconRank = () => {
    if (data?.clanRank > data?.previousClanRank) {
      return <ChevronDown set="bold" primaryColor="red" className="" />
    } else if (data?.clanRank < data?.previousClanRank) {
      return <ChevronUp set="bold" primaryColor="green" className="" />
    } else {
      return <Text color="neutral" css={{ transform: "scale(.85)", paddingTop: "" }}><TiEquals /></Text>
    }
  }
  



  return (
    <>
    <Card
        className="group relative transition-transform ease-in duration-200 "
        css={{
          minWidth: "250px",
          maxWidth: "450px",
          borderRadius: "12px",
          borderWidth: ".5px",
          borderColor: "rgba(107, 114, 110, 0.5)",
        
        }}>
          
          <Row css={{padding:"0px 4px 4px 4px",width:"100%"}}>
            <Col>
              <Row>
                <Col span={2}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="flex flex-row justify-around items-center group mt-1">
                    <div className='flex flex-row justify-center items-center relative'>
                      <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                      <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={32} width={32} className='mt-1 drop-shadow-md' alt="xp" />
                      <div className='absolute text-white text-lg font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]'>{data.expLevel || 0}</div>
                    </div>
                  </motion.div>
                </Col>
                <Spacer x={.5} />
                <Col span={7}>
                  <Text size={15} weight="extrabold" className="truncate-text">
                    {data?.name || "-"}
                  </Text>
                  <Text size={10} color={getRoleColor(data?.role)} className="uppercase much-letter-spacing">
                    {(data?.role === "admin") ? "Elder" : `${data?.role}` || "-"}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={3}>
            <Row justify="flex-end">
            <Card.Image
                      src={bhImage}
                      width={40}
                      quality={30}
                      height={40}
                      alt="clan card bh"
                      className={`mt-1 drop-shadow-lg scale-75`}
                    />
                    <Card.Image
                      src={thImage}
                      width={45}
                      quality={30}
                      height={45}
                      alt="clan card th"
                      className={`drop-shadow-lg scale-75`}
                    />
              </Row>
            </Col>
            <Spacer />
            <Col span={1}>
              <Row justify="flex-end" align="center" css={{ padding: "9px 5px 0px 0px" }}>
                <div className="flex flex-row items-center border-[.5px] border-gray-500/30 rounded-[8px] p-1">
                  <Text size={14} weight="extrabold" className="text-center" b>
                    {data?.clanRank || "-"}
                  </Text>
                  {<IconRank /> || "-"}
                </div>
              </Row>
            </Col>
          </Row>
         <Card.Divider />
         {buttonState ? (
          <Row css={{margin:"5px 0px 0px 0px"}}>
          <Col align="center" css={{ margin: "0px 0px 5px 5px" }}>
            <Card
              onPress={handleRemovePlayer}
              key={data.tag}
              isPressable
              css={{
                maxWidth: "100%",
                padding: "2px 0px",
                backgroundColor: { teamButtonRemoveColor },
                borderRadius: "8px",
                backgroundColor: "rgba(43, 43, 43, 0.2)",
                "&:hover": { backgroundColor: "rgba(175, 175, 175, 0.5)" }
              }}

              variant="bordered"
            >
              <div id="toaster" className="flex flex-row items-center justify-center px-2 gap-2"><MdOutlineDeleteOutline />
                <Text weight="normal" size={13}>Remove Player</Text></div>
            </Card>
         </Col>
          <Col align="center" css={{ margin: "0px 5px 5px 5px" }}>
            <Card
              onPress={handleAddPlayer}
              isPressable
              css={{
                maxWidth: "100%",
                padding: "2px 0px",
                borderRadius: "8px",
                borderColor:"rgba(0, 255, 156, 0.4)",
                backgroundColor: "rgba(0, 255, 156, 0.3)",
                "&:hover": { backgroundColor: "rgba(0, 255, 156, 0.5)" }
              }}

              variant="bordered"
            >
              <div className="flex flex-row items-center justify-center px-2 gap-2">{!isPlayerAlreadyAdded ? <AiOutlineUserAdd /> : <BiUserCheck />}
                <Text weight="normal" size={13} className="">{isPlayerAlreadyAdded ? "Added" : "Add Player"}</Text></div>
            </Card>
          </Col>
        </Row>

         ) : ( 
          <Row css={{margin:"5px 0px 0px 0px"}}>
            <Col align="center" css={{ margin: "0px 0px 5px 5px" }}><CopyToClipboard className="group" text={data?.tag || "null"}>
              <Card
                onPress={() => toast(`Copied "${data?.tag}" to clipboard`)}
                key={data.tag}
                isPressable
                css={{
                  maxWidth: "100%",
                  padding: "2px 0px",
                  backgroundColor: { copyButton },
                  borderRadius: "8px",
                  backgroundColor: "rgba(43, 43, 43, 0.2)",
                  "&:hover": { backgroundColor: "rgba(175, 175, 175, 0.5)" }
                }}

                variant="bordered"
              >
                <div id="toaster" className="flex flex-row items-center justify-center px-2 gap-2"><LuCopy />
                  <Text weight="normal" size={13}>{data?.tag || "-"}</Text></div>
              </Card>
            </CopyToClipboard></Col>
            <Col align="center" css={{ margin: "0px 5px 5px 5px" }}>
              <Card
                onPress={handleSubmitPlayer}
                isPressable
                css={{
                  maxWidth: "100%",
                  padding: "2px 0px",
                  borderRadius: "8px",
                  borderColor:"rgba(0, 255, 156, 0.4)",
                  backgroundColor: "rgba(0, 255, 156, 0.3)",
                  "&:hover": { backgroundColor: "rgba(0, 255, 156, 0.5)" }
                }}

                variant="bordered"
              >
                <div className="flex flex-row items-center justify-center px-2 gap-2"><FiExternalLink />
                  <Text weight="normal" size={13} className="">Visit Profile</Text></div>
              </Card>
            </Col>
          </Row> )}
        
        </Card>
    </>
  );
}

export default ClanList;