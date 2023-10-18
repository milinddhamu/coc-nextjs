import { Card, Image, Spacer, Badge, Text, Col, Grid, Container, Row, User, Avatar, Table, Tooltip } from "@nextui-org/react";
import { Star, ChevronUp, ShieldDone, ChevronDown } from "react-iconly";
import ProfileProgress from '@/utils/ProfileProgress';
import { motion } from 'framer-motion';
import NavbarMain from "@/components/NavbarMain";

const ProfileMainDetails = ({ data }) => {
  const roleOfPlayer = (data?.role === "admin") ? "elder" : data?.role
  const mainDetails =  [
    {
      id: 'Role',
      text:roleOfPlayer.toUpperCase() || "-",
      url: '/assets/others/sheild.png',
      color: 'error'
    },
    {
      url: '/assets/others/Star.png',
      text: data?.warStars|| "-",
      id: 'War Stars',
      color: 'warning',
    },
    {
      url: data?.league?.iconUrls?.small || '/assets/others/no_league.png',
      id: data?.league?.name || 'Unranked',
      text: data.trophies,
      color: 'secondary',
    },
    {
      url: '/assets/others/legendTrophy.png',
      text: data?.legendStatistics?.legendTrophies|| "-",
      id: 'Legend Trophies',
      color: 'secondary',
    },
    {
      url: '/assets/others/builderTrophy.png',
      text: data?.versusTrophies|| "-",
      id: 'Versus Battle Trophies',
      color: 'warning',
    },
    {
      url: '/assets/others/arrowUp.png',
      text: data?.donations|| "-",
      id: 'Troops Donated',
      color: 'success',
    },
    {
      url: '/assets/others/arrowDown.png',
      text: data?.donationsReceived|| "-",
      id: 'Troops Recieved',
      color: 'error',
    },
    {
      url: '/assets/others/battle.png',
      text: data?.attackWins|| "-",
      id: 'Battle Wins',
      color: "secondary",
    },
    {
      url: '/assets/others/defence.png',
      text: data?.defenseWins || "-",
      id: 'Defense Won',
      color: 'success',
    },
    {
      url: '/assets/others/Axes.png',
      text: data?.versusBattleWins|| "-",
      id: 'Versus Battle Wins',
      color: 'warning',
    },
    {
      url: '/assets/others/GoldC.png',
      text: data?.clanCapitalContributions|| "-",
      id: 'Clan Capital Total Contribution',
      color: 'warning',
    },
   ]

  const xp = data.expLevel
  const totalXp = () => {
    return (


      (2 <= xp && xp <= 200) ?
        xp * 50 :
        (201 <= xp && xp <= 299) ?
          (500 * (xp) + 9500) :
          (1000 * (xp) + 60000)
    )
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    hidden: { width: '50%' },
    visible: { width: '100%', transition: { duration: 1, ease: "easeOut", } },
  };

  const springAnimation = {
    type: "spring",
    damping: 10,
    stiffness: 200,
    delay:0.5,
  };

  return (
    <>
      <div className='w-full'>
        <Card
          css={{
            border: 'none',
            shadow:"$lg",
            borderRadius:"8px",
            padding:"0px",
            margin:"0px"
          }}
        >
          <Card.Body>
            <Grid.Container gap={2} className="justify-around" >
              {mainDetails.map((a, i) => {
                return (
                  (a.url && a.text) ?
                    <Grid key={a.id} >
                      <Tooltip content={a.id} color={a.color} hideArrow css={{borderRadius:"8px"}} >
                        <div className="flex flex-row items-center">
                      {/* <Avatar
                            borderWeight="light"
                            className="cursor-pointer transition-all ease-linear absolute"
                            zoomed
                            size="md"
                            src={a.url}
                            bordered
                            squared
                          /> */}
                          <Image 
                          src={a.url}
                          alt={a.id}
                          height={40}
                          width={40}
                          quality={30}
                          className="cursor-pointer transition-all ease-linear absolute z-40"
                                              />
                          <Spacer />
                          <Badge
                            size='md'
                            color={a.color}
                            className="relative z-0"
                            variant="flat"
                            isSquared
                            css={{
                              minWidth: '100px',
                              border:"none",
                            }}
                          >
                            {a.text || "-"}
                          </Badge>
                          </div>
                       
                      </Tooltip>
                     
                    </Grid>
                    : <></>
                )
              })}
            </Grid.Container>
            <Spacer y={1} />
            <Card.Divider />
            <Spacer y={1} />
            <ProfileProgress data={data} position="player" />
            </Card.Body>
          
        </Card>
      </div>
    </>
  )
}

export default ProfileMainDetails;

