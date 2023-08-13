import { Card, Col, Text,Link,Spacer, Container } from "@nextui-org/react";

const LeftSection = ({townHall}) => {
  return (
    <>
      <main className='flex flex-grow flex-col px-6 gap-2'>
        <div className="flex flex-col">
        <Text b>Curated Links for you</Text>
      <Spacer y={.5}/>
      <div className="border-l-[1px] border-gray-500/30 px-1">
      <Link block color="warning" css={{fontSize:"14px"}}  href={`https://clashofclans-layouts.com/plans/th_${townHall}/war/`} isExternal underline>
        Best War Bases for your Townhall{" "}{townHall}
      </Link>
      <Link  block css={{fontSize:"14px"}} href={`https://clashofclans-layouts.com/plans/th_${townHall}/legend_league/`}  isExternal underline color="secondary">
      Best Legend League bases for your Townhall{" "}{townHall}

      </Link>
      <Link block css={{fontSize:"14px"}}  href={`https://clashofclans-layouts.com/plans/th_${townHall}/farm/`}  isExternal underline color="success">
      Best Farming Bases for your Townhall{" "}{townHall}

      </Link>
      </div>
      <Spacer />

      </div>
        <Card variant="bordered" className="flex flex-col items-center max-h-96 min-h-72 w-full">
          <div className='overflow-y-scroll scrollbar-hide w-full'>
            <a
              className="twitter-timeline" data-width="auto" data-height="auto" data-theme="dark" href="https://twitter.com/ClashofClans?ref_src=twsrc%5Etfw">Tweets by ClashofClans</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          </div>
        </Card>
      </main>
    </>
  );
}

export default LeftSection;