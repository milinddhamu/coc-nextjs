import { Grid, Cols, Badge, Text, Avatar, Tooltip, Collapse, Modal, User, Link, Spacer } from '@nextui-org/react';
import ToolTip from "./ToolTip"
import Image from 'next/image';
import { PiSword } from 'react-icons/pi';
import { homeArmy, homeSpells, homeHeroes, seigeMachines, homePets } from './Data/HomeArmyData';
const HomeVillageArmy = ({ data }) => {

  // function to fetch troop level
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

  // function to Spell hero level
  function fetchSpellLevel(spellId, spellVillage) {
    // Find the troop object with the specified ID
    const spell = data.spells.find(spell => spell.name === spellId && spell.village === spellVillage);

    if (spell) {
      // Troop found, return its level
      return spell.level
    } else {
      // Troop not found
      return null; // Or any other value indicating the troop was not found
    }
  }

  // function to fetch hero level
  function fetchHeroLevel(heroId) {
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

  // function for max level or not
  function fetchMaxLevelTroop(troopId) {
    const troopMax = data.troops.find(troop => troop.name === troopId.id && troop.village === troopId.village)
    if (troopMax.level === troopId.maxLevel) {
      return true
    } else {
      return false
    }
  }

  function fetchMaxLevelHero(heroId) {
    const heroMax = data.heroes.find(troop => troop.name === heroId.id && troop.village === heroId.village)
    if (heroMax.level === heroId.maxLevel) {
      return true
    } else {
      return false
    }
  }

  function fetchMaxLevelSpell(spellId) {
    const spellMax = data.spells.find(troop => troop.name === spellId.id && troop.village === spellId.village)
    if (spellMax.level === spellId.maxLevel) {
      return true
    } else {
      return false
    }
  }

  function superTroop(troopId) {
    const superTroop = data.troops.find(troop => troop.name === troopId.id && troop.village === troopId.village)
    if (troopId.superTroop) {
      if (superTroop && superTroop.level >= troopId.superTroopLevel) {
        return true // check if its super troop color also for that
      } else {
        return false // else we return nothing as we need it only for css
      }
    } else {
      return false
    }

  }

  return (
    <>
      <main className='flex flex-col justify-center items-center gap-4  '>
        <Collapse.Group shadow className="MaterialShadow" css={{ borderRadius: "20px",minWidth:"100%",gap:"0px" }}>
          <Collapse aria-label="army" className="open-collapse" title={<main className="flex flex-row justify-start items-center">
            <Image src={"/assets/icons/SuperBarbarian.png"} height={35} width={35} alt="super barbarian" />
            <Spacer x={.5} />
            <Text weight="bold" size={13}>Troops</Text></main>} arrowIcon={<PiSword />} expanded>
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {homeArmy.map((a, i) => {
                return (
                  <Grid key={a?.id} className='group' >
                    {(fetchTroopLevel(a.id, a.village)) ?
                      <>
                        <Tooltip hideArrow css={{ borderRadius: "8px" }}
                          content={<><main className="flex flex-col justify-center items-start w-full"><div className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village)}</div>
                            <ToolTip a={a} level={fetchTroopLevel((a.id), a.village)} super={superTroop}/></main></>} rounded placement="center">
                          <Badge isSquared color={(fetchMaxLevelTroop(a)) ? "error" : "primary"} content={fetchTroopLevel(a.id, a.village)} placement="bottom-left"
                            horizontalOffset="10%"
                            verticalOffset="10%"
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
                            <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"} group `}>
                              <Avatar
                                zoomed
                                borderWeight="normal"
                                bordered
                                color={superTroop(a) ? "warning" : ""}
                                squared
                                size="lg"
                                src={a.url}
                                className="cursor-pointer"
                              />
                            </div>
                          </Badge>
                        </Tooltip>
                      </>
                      :
                      <div>
                        <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village) || "Locked Troop"}</h1>
                          <ToolTip a={a} /></main></>} rounded placement="bottom">
                          <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                            <Avatar
                              zoomed
                              borderWeight="light"
                              bordered
                              squared
                              size="lg"
                              src={a.url}
                              className="cursor-pointer" />
                          </div>
                        </Tooltip>
                      </div>
                    }
                  </Grid>
                )
              })}
            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed troops</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="error" /><Text h5 weight="light" size={10}>Maxed out troops</Text></div>
              <div className="relative flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="warning" /><Text h5 weight="light" size={10}>Super troop unlocked!</Text></div>
            </div>
          </Collapse>
          <Collapse aria-label="spells" className="open-collapse" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/ElixirSpells.png"} height={35} width={35} alt="ElixirSpells" /><Spacer x={.5} /><Text weight="bold" size={13}>Spells</Text></main>} arrowIcon={<PiSword />}>
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {homeSpells.map((a, i) => {
                return (
                  <Grid key={a?.id}>
                    {(fetchSpellLevel(a.id, a.village)) ?
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchSpellLevel((a.id), a.village)}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelSpell(a)) ? "error" : "primary"} content={(fetchSpellLevel(a.id, a.village))} placement="bottom-left"
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
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url}
                            className="cursor-pointer" />
                        </Badge>
                      </Tooltip> :
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchSpellLevel((a.id), a.village) || "Locked Spell"}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} className="cursor-pointer" />
                        </div>
                      </Tooltip>

                    }

                  </Grid>
                )
              })}

            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed spells</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="error" /><Text h5 weight="light" size={10}>Maxed out spells</Text></div>
            </div>
          </Collapse>
          <Collapse aria-label="heroes" className=" open-collapse" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/PartyKing.png"} height={35} width={35} alt="PartyKing" /><Spacer x={.5} /><Text weight="bold" size={13} >Heroes</Text></main>} arrowIcon={<PiSword />} >
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {homeHeroes.map((a, i) => {
                return (
                  <Grid key={a?.id}>
                    {(fetchHeroLevel(a.id, a.village) ?
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchHeroLevel((a.id), a.village) || "Locked Hero"}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelHero(a)) ? "error" : "primary"} content={fetchHeroLevel(a.id, a.village) || "Locked Hero"} placement="bottom-left"
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
                              zoomed
                              borderWeight="light"
                              bordered
                              squared
                              size="lg"
                              src={a.url} className="cursor-pointer" />
                          </div>
                        </Badge>
                      </Tooltip> :
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchHeroLevel((a.id), a.village)}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <div className={`${(fetchHeroLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} className="cursor-pointer" />
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
              <div className="flex flex-row gap-2 items-center">
                <Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="primary" />
                <Text h5 weight="light" size={10}>Non-Maxed heroes</Text>
              </div>
              <div className="flex flex-row gap-2 items-center" >
                <Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="error" />
                <Text h5 weight="light" size={10}>Maxed out heroes</Text>
              </div>
            </div>
          </Collapse>

          <Collapse aria-label="pets" className=" open-collapse" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/Unicorn.png"} height={35} width={35} alt="Unicorn" /><Spacer x={.5} /><Text weight="bold" size={13}  >Pets</Text></main>} arrowIcon={<PiSword />}
          >
            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {homePets.map((a, i) => {
                return (
                  <Grid key={a?.id}>
                    {(fetchTroopLevel(a.id, a.village)) ?
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village)}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelTroop(a)) ? "error" : "primary"} content={fetchTroopLevel(a.id, a.village)} placement="bottom-left"
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
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} className="cursor-pointer" />
                        </Badge>
                      </Tooltip> :
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village) || "Locked Pet"}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} className="cursor-pointer" />
                        </div>
                      </Tooltip>}


                  </Grid>
                )
              })}

            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed pets</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="error" /><Text h5 weight="light" size={10}>Maxed out pets</Text></div>
            </div>
          </Collapse>
          <Collapse aria-label="seige" className="open-collapse" title={<main className="flex flex-row justify-start items-center"><Image src={"/assets/icons/BattleDrill.png"} height={35} width={35} alt="BattleDrill" /><Spacer x={.5} /><Text weight="bold" size={13} >Seige Machines</Text></main>} arrowIcon={<PiSword />}
          >

            <Grid.Container gap={1} className='flex justify-center h-full w-full'>
              {seigeMachines.map((a, i) => {
                return (
                  <Grid key={a?.id}>

                    {(fetchTroopLevel(a.id, a.village)) ?
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start "><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village)}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <Badge color={(fetchMaxLevelTroop(a)) ? "error" : "primary"} content={fetchTroopLevel(a.id, a.village)} placement="bottom-left"
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
                          <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                            <Avatar
                              zoomed
                              borderWeight="light"
                              bordered
                              squared
                              size="lg"
                              src={a.url} className="cursor-pointer" />
                          </div>
                        </Badge>
                      </Tooltip>
                      :
                      <Tooltip hideArrow css={{ borderRadius: "8px" }} content={<><main className="flex flex-col justify-center items-start"><h1 className="font-extrabold z-10">{" "}Level - {fetchTroopLevel((a.id), a.village) || "Locked Seige Machine"}</h1>
                        <ToolTip a={a} /></main></>} rounded placement="bottom">
                        <div className={`${(fetchTroopLevel(a.id, a.village)) ? "" : "saturate-0"}`}>
                          <Avatar
                            zoomed
                            borderWeight="light"
                            bordered
                            squared
                            size="lg"
                            src={a.url} className="cursor-pointer" />
                        </div>
                      </Tooltip>
                    }

                  </Grid>
                )
              })}
            </Grid.Container>
            <Spacer />
            <div className="flex flex-row justify-around items-center max-w-96">
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="primary" /><Text h5 weight="light" size={10}>Non-Maxed Seige Machines</Text></div>
              <div className="flex flex-row gap-2 items-center"><Badge isSquared enableShadow css={{ height: "16px", width: "16px", border: "none" }} color="error" /><Text h5 weight="light" size={10}>Maxed out Seige Machines</Text></div>
            </div>
          </Collapse>
        </Collapse.Group>
      </main>
    </>
  );
}

export default HomeVillageArmy;