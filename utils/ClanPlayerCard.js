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
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineAddModerator,MdOutlineDeleteOutline } from "react-icons/md";
import {useSetRecoilState ,useRecoilValue} from "recoil"
import { teamState } from "@/recoil/storage";
import { BiUserCheck } from "react-icons/bi";

const ClanPlayerCard = ({ data,buttonState }) => {
  const setTeam = useSetRecoilState(teamState);
  const teamList = useRecoilValue(teamState);
  const isPlayerAdded = (string,array) => array.includes(string);
  const isPlayerAlreadyAdded = isPlayerAdded(data.tag, teamList);
  const townHallDefense = townHall[data.townHallLevel]?.townhallweaponlevel[data.townHallWeaponLevel]?.url
  const townHallStorage = townHall[data.townHallLevel]?.url
  const thImage = (data.townHallLevel > 11) ? townHallDefense : townHallStorage
  const bhImage = builderHall[data.builderHallLevel]?.url
  const { isDark } = useTheme();
  const copyButtonColor = isDark ? "#0F1212" : "#9BA1A6";
  const teamButtonRemoveColor = isPlayerAlreadyAdded ? "#F3126080" : "#71717A";
  const teamButtonAddColor = isPlayerAlreadyAdded ? "#17C96480" : "#F31260";

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
  const mainDetails = [
    {
      url: '/assets/others/Star.png',
      text: data?.warStars || "-",
      id: 'War Stars',
      color: 'warning',
    },
    {
      url: '/assets/others/battle.png',
      text: cwlStars || "-",
      id: 'Clan War League Stars',
      color: 'warning',
    },
    {
      url: data?.league?.iconUrls?.small || '/assets/others/no_league.png',
      id: data?.league?.name || "League",
      text: data?.trophies || "-",
      color: 'secondary',
    },
    {
      url: '/assets/others/builderTrophy.png',
      text: data?.versusTrophies || "-",
      id: 'Versus Battle Trophies',
      color: 'warning',
    },
    {
      url: '/assets/others/arrowUp.png',
      text: data?.donations || '-',
      id: 'Troops Donated',
      color: 'success',
    },
    {
      url: '/assets/others/arrowDown.png',
      text: data?.donationsReceived || '-',
      id: 'Troops Recieved',
      color: 'error',
    },
  ]

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
  }

  const IconRank = () => {
    if (data?.clanRank > data?.previousClanRank) {
      return <ChevronDown set="bold" primaryColor="red" className="" />
    } else if (data?.clanRank < data?.previousClanRank) {
      return <ChevronUp set="bold" primaryColor="green" className="" />
    } else {
      return <Text color="neutral" css={{ transform: "scale(.85)", paddingTop: "" }}><TiEquals /></Text>
    }
  }

  const fetchHeroLevel = (heroId) => {
    // Find the troop object with the specified ID
    const hero = data.heroes.find(hero => hero.name === heroId);

    if (hero) {
      // Troop found, return its level
      return hero.level

    } else {
      // Troop not found
      return null; // Or any other value indicating the troop was not found
    }
  }
  const fetchMaxLevelHero = (heroId) => {
    const heroMax = data.heroes.find(troop => troop.name === heroId.id && troop.village === heroId.village)
    if (heroMax.level === heroId.maxLevel) {
      return true
    } else {
      return false
    }
  }
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = ({clientX,clientY,currentTarget}) => {
    let { left,top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  const shadowColor = isDark ? "rgb(255 255 255/0.15)" : "rgb(0 0 0/0.15)";

  // functions to add and remove players from team
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
  return (
    <>
      <Card
        onMouseMove={handleMouseMove}
        className="group relative transition-transform ease-in duration-200 "
        css={{
          minWidth: "200px",
          maxWidth: "450px",
          borderRadius: "12px",
          borderWidth: ".5px",
          borderColor: "rgba(107, 114, 110, 0.5)",
        
        }}>{/*error here inside opacity and group */}
        <Card.Header className="w-full" css={{ padding: "0px 4px 4px 4px", margin: "0px" }}>
          <Row>
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
                      <div className='absolute text-white text-xl font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)]'>{data.expLevel || 0}</div>
                    </div>
                  </motion.div>
                </Col>
                <Spacer x={.5} />
                <Col span={7}>
                  <Text title={data?.name} id={data?.name} size={15} weight="extrabold" className="truncate-text">
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
                      className={`mt-1 drop-shadow-lg`}
                    />
                    <Card.Image
                      src={thImage}
                      width={45}
                      quality={30}
                      height={45}
                      alt="clan card th"
                      className={`drop-shadow-lg`}
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
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ padding: "6px 2px", margin: "0px", overflow: "hidden" }}>
          <Col>
            <Row>
              <Grid.Container css={{ padding: "8px 20px" }} gap={1}  justify="center">
                {mainDetails.map((a, i) => {
                  return (
                    (a.url && a.text) ?
                      <Grid key={a.id} >
                        <div className="flex flex-row items-center">
                          <Image
                            src={a.url}
                            alt={a.id}
                            height={30}
                            width={30}
                            quality={30}
                            className="cursor-pointer transition-all ease-linear absolute z-10"
                          />
                          <Spacer />
                          <Badge
                            size='xs'
                            color={a.color}
                            className="relative z-0"
                            variant="flat"
                            isSquared
                            css={{
                              minWidth: '50px',
                              border: "none",
                            }}
                          >
                            {a.text || "-"}
                          </Badge>
                        </div>

                      </Grid>
                      : <></>
                        )}
                )}
              </Grid.Container>
            </Row>
            <Spacer y={.5}/>
            <Col span={7} css={{ padding: "8px 10px" }}>
              <ProfileProgress data={data} position="clan" />
            </Col>
            <Col span={5} css={{padding:"10px 2px"}}>
              <Grid.Container gap={.5} justify="center">
                {homeHeroes.map(
                  (a, i) =>
                    <Grid key={i}>
                      {(fetchHeroLevel(a.id, a.village) ? <Badge color={(fetchMaxLevelHero(a)) ? "error" : "primary"} content={fetchHeroLevel(a.id, a.village) || "Locked Hero"} placement="bottom-left"
                        horizontalOffset="15%"
                        verticalOffset="15%"
                        enableShadow
                        css={{
                          minWidth: "20px",
                          fontWeight: "900",
                          padding: "0px",
                          border: "none",
                          margin: "0px",
                          borderRadius: "6px",
                        }}
                      >
                        <div className={`${(fetchHeroLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            alt={a.id}
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="md"
                            src={a.url} className="cursor-pointer" />
                        </div>
                      </Badge> : <div className={`${(fetchHeroLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                        <Avatar
                          alt={a.id}
                          zoomed
                          borderWeight="light"
                          bordered
                          squared
                          size="md"
                          src={a.url} className="cursor-pointer" />
                      </div>
                      )}
                    </Grid>
                )
                }
              </Grid.Container>
            </Col>
          </Col>
        </Card.Body>
        <Card.Divider />
        <Card.Footer css={{ backgroundImage: "linear-gradient(90deg, rgba(131,58,180,.4) 0%, rgba(252,132,69,.4) 50%, rgba(253,253,29,.4) 100%)", borderRadius: "1px", backdropFilter: "blur(12px)", padding: "5px 3px", margin: "0px" }}>
          {buttonState ? <>
          <Row>
            <Col align="center" css={{ margin: "0px 3px" }}>
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
                <div id="toaster" className="flex flex-row items-center justify-center px-2 gap-2"><MdOutlineDeleteOutline/>
                  <Text weight="normal" size={13}>Remove Player</Text></div>
              </Card>
            </Col>
            <Col align="center" css={{ margin: "0px 3px" }}>
              <Card
                onPress={handleAddPlayer}
                isPressable
                css={{
                  maxWidth: "100%",
                  padding: "2px 0px",
                  borderRadius: "8px",
                  borderColor:{teamButtonAddColor},
                  backgroundColor: "rgba(0, 255, 156, 0.3)",
                  "&:hover": { backgroundColor: "rgba(0, 255, 156, 0.5)" }
                }}

                variant="bordered"
              >
                <div className="flex flex-row items-center justify-center px-2 gap-2">{!isPlayerAlreadyAdded ? <AiOutlineUserAdd /> : <BiUserCheck />}
                  <Text weight="normal" size={13} className="">{isPlayerAlreadyAdded ? "Added" : "Add Player"}</Text></div>
              </Card>
            </Col>
          </Row> </> :
          <>
          <Row>
          <Col align="center" css={{ margin: "0px 3px" }}><CopyToClipboard className="group" text={data?.tag || "null"}>
            <Card
              onPress={() => toast(`Copied "${data?.tag}" to clipboard`)}
              key={data.tag}
              isPressable
              css={{
                maxWidth: "100%",
                padding: "2px 0px",
                backgroundColor: { copyButtonColor },
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
          <Col align="center" css={{ margin: "0px 3px" }}>
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
        </Row> </>
          }
        </Card.Footer>

        {/* Background interactive shadow*/}

        <motion.div
          className="pointer-events-none absolute opacity-20 group-hover:opacity-30 transition-all ease-in duration-300" style={{ 
            background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${shadowColor},transparent 80%)` , borderRadius:"8px",inset:"-1px",zIndex:"-10"}}/>


      </Card>
      </>
  );
}

export default ClanPlayerCard;