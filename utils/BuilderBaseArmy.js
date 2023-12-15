import { Grid, Cols, Badge, Text, Avatar, Tooltip, Collapse,Spacer } from '@nextui-org/react';
import ToolTip from './ToolTip';
import { PiSword } from 'react-icons/pi';
import {builderArmy,builderHeroes} from './Data/BuilderArmyData';
import Image from 'next/image';

const BuilderBaseArmy = ({ data }) => {
 

  function fetchTroopLevel(troopId, troopVillage) {
    // Find the troop object with the specified ID
    const troop = data.troops.find(troop => troop.name === troopId && troop.village === troopVillage);

    if (troop) {
      // Troop found, return its level
      return troop.level
    } else {
      // Troop not found
      return null; // Or any other value indicating the troop was not found
    }
  }

  function fetchHeroLevel(heroId, troopVillage) {
    // Find the troop object with the specified ID
    const hero = data.heroes.find(hero => hero.name === heroId && hero.village === troopVillage);

    if (hero) {
      // Troop found, return its level
      return hero.level
    } else {
      // Troop not found
      return null; // Or any other value indicating the troop was not found
    }
  }

  function fetchMaxLevelHero(heroId) {
    const heroMax = data.heroes.find(hero => hero.name === heroId.id && hero.village === heroId.village)
    if (heroMax.level === heroId.maxLevel){
      return true
    } else {
      return false
    }
  }

  function fetchMaxLevelTroop(troopId) {
    const troopMax = data.troops.find(troop => troop.name === troopId.id && troop.village === troopId.village)
    if (troopMax.level === troopId.maxLevel){
      return true
    } else {
      return false
    }
  }


  return (
    <>
      <main className='flex flex-col justify-center items-center gap-4 '>
        <Collapse.Group className="threeDShadowLight" css={{borderRadius:"20px",minWidth:"100%"}}>
          <Collapse className="open-collapse" aria-label="builder army" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/SneakyArcher.png"} height={35} width={35} alt="SneakyArcher" /><Spacer x={.5}/><Text weight="bold" size={13} >Troops</Text></main>} expanded arrowIcon={<PiSword />}>
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {builderArmy.map((a, i) => {
                return (
                  <Grid key={a.id}>
                    {(fetchTroopLevel(a.id, a.village)) ?
                      <Tooltip hideArrow css={{borderRadius:"8px"}} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village)}</h1>
                      <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelTroop(a)) ? "error" : "primary"} content={fetchTroopLevel(a.id, a.village)} placement="bottom-left"
                          horizontalOffset="15%"
                          verticalOffset="15%"
                          enableShadow
                          css={{
                            minWidth: "20px",
                            fontWeight:"900",
                            padding:"0px",
                            border:"none",
                            margin:"0px",
                            borderRadius:"6px",
                          }}
                        >
                          <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                            <Avatar
                              zoomed
                              borderWeight="light"
                              bordered
                              squared
                              size="lg"
                              src={a.url} 
                              className="cursor-pointer"/>
                          </div>
                        </Badge>
                      </Tooltip>
                      :
                      <Tooltip hideArrow css={{borderRadius:"8px"}} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village)}</h1>
                      <ToolTip a={a} /></main></>} rounded color="warning" placement="bottom">
                        <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} 
                            className="cursor-pointer"/>
                        </div>
                      </Tooltip>
                    }
                  </Grid>
                )
              })}
            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{height:"16px",width:"16px",border:"none"}} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed troops</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{height:"16px",width:"16px",border:"none"}} color="error" /><Text h5 weight="light" size={10}>Maxed out troops</Text></div>
              </div>
          </Collapse>
          
          <Collapse className="open-collapse" aria-label="builder heroes" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/ArmoredBattleMachine.png"} height={35} width={35} alt="ArmoredBattleMachine" /><Spacer x={.5}/><Text weight="bold" size={13} >Heroes</Text></main>} arrowIcon={<PiSword />} >
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {builderHeroes.map((a, i) => {
                return (
                  <Grid key={a.id}>
                    {(fetchHeroLevel(a.id, a.village) ?
                      <Tooltip hideArrow css={{borderRadius:"8px"}} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchHeroLevel((a.id), a.village) || "Locked Hero"}</h1>
                      <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelHero(a)) ? "error" : "primary"} content={fetchHeroLevel(a.id, a.village)} placement="bottom-left"
                          horizontalOffset="15%"
                          verticalOffset="15%"
                          enableShadow
                          css={{
                            minWidth: "20px",
                            fontWeight:"900",
                            padding:"0px",
                            border:"none",
                            margin:"0px",
                            borderRadius:"6px",
                          }}
                        >
                          <div className={`${(fetchHeroLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                            <Avatar
                              zoomed
                              borderWeight="light"
                              bordered
                              squared
                              size="lg"
                              src={a.url} 
                              className="cursor-pointer"/>
                          </div>
                        </Badge>
                      </Tooltip> :
                      <Tooltip hideArrow css={{borderRadius:"8px"}} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchHeroLevel((a.id), a.village) || "Locked Hero"}</h1>
                      <ToolTip a={a} /></main></>} rounded color="warning" placement="bottom">
                        <div className={`${(fetchHeroLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} 
                            className="cursor-pointer"/>
                        </div>
                      </Tooltip>
                    )
                    }
                  </Grid>
                )
              })}

            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{height:"16px",width:"16px",border:"none"}} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed heroes</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{height:"16px",width:"16px",border:"none"}} color="error" /><Text h5 weight="light" size={10}>Maxed out heroes</Text></div>
              </div>
          </Collapse>

        </Collapse.Group>
      </main>
    </>
  );
}

export default BuilderBaseArmy;