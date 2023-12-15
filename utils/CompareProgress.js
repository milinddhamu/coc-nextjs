import ProfileProgress from "@/utils/ProfileProgress"
import { Card, Progress, Text, Spacer } from "@nextui-org/react";

const CompareProgress = ({playerOneData , playerTwoData}) => {
  const PROGRESS_NAME = [
    "Troops",
    "Heroes",
    "Spells",
    "Achievs"
  ]
  return (
    <div className="flex flex-row w-full max-w-4xl">
      <div className="w-full">
      <ProfileProgress data={playerOneData} position="player" hide="true"/>
      </div>
      <div className="col-span-1">
        {PROGRESS_NAME.map((item)=>(
          <>
          <Text key={item} css={{ textAlign: "center" }} weight="semibold" size={13}>{item}</Text>
          <Spacer y={.5} />

          </>
        ))}
      </div>
      <div className="w-full">
      <ProfileProgress data={playerTwoData} position="player" hide="true"/>
      </div>
    </div>
    
  );
}

export default CompareProgress;