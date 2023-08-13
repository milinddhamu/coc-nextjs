import { Card, Progress, Text, Spacer } from "@nextui-org/react";

const ProfileProgress = ({ data,position }) => {
  const textSize = position === "player" && 15 || position === "clan" && 11;
  const maxWidthText = position === "player" && 90 || position === "clan" && 60;
  const paddingWise = position === "player" && 4 || position === "clan" && 0;
  const troopsLevel = (data?.troops).reduce((total, a) => total + Number(a.level), 0)
  const troopsMaxLevel = (data?.troops).reduce((total, a) => total + Number(a.maxLevel), 0)
  const troopsPercent = Math.floor((troopsLevel / troopsMaxLevel) * 100)

  const heroesLevel = (data?.heroes).reduce((total, a) => total + Number(a.level), 0)
  const heroesMaxLevel = (data?.heroes).reduce((total, a) => total + Number(a.maxLevel), 0)
  const heroesPercent = Math.floor((heroesLevel / heroesMaxLevel) * 100)

  const spellsLevel = (data?.spells).reduce((total, a) => total + Number(a.level), 0)
  const spellsMaxLevel = (data?.spells).reduce((total, a) => total + Number(a.maxLevel), 0)
  const spellsPercent = Math.floor((spellsLevel / spellsMaxLevel) * 100)

  const achievementsLevel = (data?.achievements).reduce((total, a) => total + Number(a.stars), 0)
  const achievementsMaxLevel = ((data?.achievements).length) * 3
  const achievementsPercent = Math.floor((achievementsLevel / achievementsMaxLevel) * 100)

  return (
    <>
      <main className={`p-${paddingWise}`}>
           <div  className={`flex gap-2 ${position === "clan" ? "" : "flex-col"} sm:flex-row justify-start items-center`}>
            <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Troops</Text>
            <Progress squared shadow value={troopsPercent || 40 } color="secondary" status="secondary">
              <Text h6 weight="semibold" size={10} className="flex justify-center">{troopsPercent || "null"}{" "}%</Text></Progress></div>
            <Spacer y={.5}/>
            <div  className={`flex gap-2 justify-start items-center ${position === "clan" ? "" : "flex-col"} sm:flex-row`}>
              <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Heroes</Text>
              <Progress squared shadow value={heroesPercent || 50 } color="warning" status="warning"><Text h6 weight="semibold" size={10} className="flex justify-center">{heroesPercent || "null"}{" "}%</Text></Progress></div>
            <Spacer y={.5}/>
            <div className={`flex gap-2 justify-start items-center ${position === "clan" ? "" : "flex-col"} sm:flex-row`}>
            <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Spells</Text>
            <Progress squared shadow value={spellsPercent || 70} color="success" status="success">
              <Text h6 weight="semibold" size={10} className="flex justify-center">{spellsPercent || "null"}{" "}%</Text></Progress></div>
            <Spacer y={.5}/>
            <div  className={`flex gap-2 justify-start items-center ${position === "clan" ? "" : "flex-col"} sm:flex-row`}>
              <Text css={{ minWidth: `${maxWidthText}px`, textAlign: "center" }} weight="semibold" size={textSize}>Achievements</Text>
              <Progress squared css={{}} value={achievementsPercent || 60} color="error" status="error">
              <Text h6 weight="semibold" size={10} className="flex justify-center">{achievementsPercent || "null"}{" "}%</Text></Progress></div>
      </main>
    </>
  );
}

export default ProfileProgress;