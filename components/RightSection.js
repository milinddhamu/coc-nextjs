import { Card, Col, Text, Container, Spacer,Avatar } from "@nextui-org/react";
import Image from "next/image";
import { parseISO, format } from 'date-fns';
import Calendar from '@/public/assets/others/Calendar.jpg'
import Countdown from "react-countdown";
import TraderRefresh from "@/utils/countDownTimer/TraderRefresh"
import RaidWeekend from "@/utils/countDownTimer/RaidWeekend"
import ClanGames from "@/utils/countDownTimer/ClanGames"
import LeagueReset from "@/utils/countDownTimer/LeagueReset"
import ClanWarLeague from "@/utils/countDownTimer/ClanWarLeague"
import ClanWarLeagueActive from "@/utils/countDownTimer/ClanWarLeagueActive"
import ClanGamesActive from "@/utils/countDownTimer/ClanGamesActive"




const RightSection = ({ data }) => {
  const countDownData = [
    { 
      id:"Trader refresh",
      url:"/assets/others/Trader.png",
    },
    { 
      id:"Raid weekend",
      url:"/assets/others/raid_icon.png",
    },
    { 
      id:"CWL",
      url:"/assets/others/battle.png",
    },
    { 
      id:"Clan games",
      url:"/assets/others/strongman.png",
    },
    { 
      id:"League reset",
      url:"/assets/others/no_league.png",
    },
    { 
      id:"Season ends",
      url:"/assets/others/goldPass.png",
    },
  ]
  const now = new Date();
  const currentMinutes = now.getMinutes()
  const currentHours = now.getHours()
  const currentDate = now.getDate();
  const currentDay = now.getDay()
  const isTime = currentMinutes > 30 && currentHours > 13;

  return (
    <>
   
      <main className='flex flex-col gap-6 pb-6 px-6 md:px-3 border-b-[.5px] border-gray-500/20 sm:border-none'>
        <Card css={{ border: "none",borderRadius:"20px",margin:"0px",padding:"0px",shadow:"$lg" }} className="relative overflow-hidden flex max-w-5xl" >
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 0 }}>
            <Col className="flex justify-center items-center">
              <Text size={16} weight="extrabold"  transform="uppercase" className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-pink-500 animate-text">
                Clash Events !
              </Text>
            </Col>
          </Card.Header>
          <Spacer y={2.5} />
          <Card.Divider />
          <Card.Body>
            {/* countdowntimer 1st */}
            <div  className="flex flex-row justify-around items-center hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
            <div className="w-10 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-pink-100 via-pink-400 to-violet-600 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[0].url}
                  alt={countDownData[0].id}
                />
              </div>
              <div className="flex flex-col text-center">
                <Text weight="semibold" color={(22 <= currentDate && currentDate <= 28) ? "success" : ""} h4>{countDownData[0].id}</Text>
                <Text>{<TraderRefresh />}
                </Text>
              </div>              
            </div>
            <Spacer y={.5} />
            <Card.Divider />

            {/* countdowntimer 2nd */}
            <Spacer y={.5} />
            <div className="flex flex-row justify-around items-center w-full hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
            <div className="w-10 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-sky-500 via-slate-100 to-yellow-600 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[1].url}
                  alt={countDownData[1].id}
                />
              </div>
              <div className="flex flex-col text-center">
                <Text weight="semibold" h4 color={(currentDay >= 5 || currentDay === 0) ? "success" : ""}>{countDownData[1].id}</Text>
                <Text>{<RaidWeekend />}
                </Text>
              </div>              
            </div>
            <Spacer y={.5} />
            <Card.Divider />
            
             {/* countdowntimer 3rd */}
             <Spacer y={.5} />
            <div className="flex flex-row justify-around items-center w-full hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
            <div className="w-10 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-amber-400 via-orange-700 to-slate-100 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[2].url}
                  alt={countDownData[2].id}
                />
              </div>
              <div className="flex flex-col text-center hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
                <Text weight="semibold" color={(1 <= currentDate && currentDate <= 10) ? "success" : ""} h4>{countDownData[2].id}{" "}{(1 <= currentDate && currentDate <= 10) ? "(Active)" : ""}</Text>
                <Text>{(1 <= currentDate && currentDate <= 10) ?
                  <ClanWarLeagueActive /> : <ClanWarLeague />}
                </Text>
              </div>
              
            </div>
            <Spacer y={.5} />
            <Card.Divider />
              
              {/* countdowntimer 4th */}
            <Spacer y={.5} />

            <div className="flex flex-row justify-around items-center w-full hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
            <div className="w-10 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-amber-200 via-yellow-400 to-orange-600 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[3].url}
                  alt={countDownData[3].id}
                />
              </div>
              <div className="flex flex-col text-center">
                <Text color={(22 <= currentDate && currentDate <= 28) ? "success" : ""} weight="semibold" h4>{countDownData[3].id}{" "}{(22 <= currentDate && currentDate <= 28) ? "(Active)" : ""}</Text>
                <Text>{(22 <= currentDate && currentDate <= 28) ? <ClanGamesActive /> :<ClanGames />}
                </Text>
              </div>
              
            </div>
            <Spacer y={.5} />
            <Card.Divider />

              {/* countdowntimer 5th */}
            <Spacer y={.5} />
            <div  className="flex flex-row justify-around items-center w-full hover:scale-105 transition-all ease-out duration-600 cursor-pointer ">
            <div className="w-10 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-slate-100 to-slate-100 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[4].url}
                  alt={countDownData[4].id}
                />
              </div>
              <div className="flex flex-col text-center">
                <Text  weight="semibold" h4>{countDownData[4].id}</Text>
                <Text>{<LeagueReset />}
                </Text>
              </div>              
            </div>
            <Spacer y={.5} />
            <Card.Divider />

            {/* countdowntimer 6th */}
            <Spacer y={.5} />

            <div className="flex flex-row justify-around items-center w-full hover:scale-105 transition-all ease-out duration-600 cursor-pointer">
            <div className="w-10 p-1 relative">
              <div className="absolute w-full h-full bg-gradient-to-b from-yellow-100 inset-0 via-yellow-400 to-orange-600 scale-75 blur rounded-2xl opacity-70"></div>
                <Card.Image
                  src={countDownData[5].url}
                  alt={countDownData[5].id}
                />
              </div>
              <div className="flex flex-col text-center">
                <Text  weight="semibold" h4>{countDownData[5].id}</Text>
                <Text>{<Countdown date={parseISO(data.endTime)} renderer={({ days, hours, minutes, seconds }) => (
      <div>
        <p>{`${days}d ${hours}h ${minutes}m`}</p>
      </div>
    )}/>}
                </Text>
              </div>
            </div>
            <Spacer y={.5} />
            <Card.Divider />
            <Spacer y={.5} />
          <Text h5 size={10} weight="normal" className="flex justify-center right-0">TIME IS EQUAL FOR EVERY REGION**</Text>
          </Card.Body>
        </Card>
        <Card.Divider />
        <Card css={{
          border: "none",
          borderRadius:"20px"
        }} className="flex flex-col items-center w-full overflow-scroll cursor-pointer scrollbar-none" >
          <Image
            src={Calendar}
            alt="Calendar"
          />
        </Card>
      </main>
    </>
  );
}

export default RightSection;