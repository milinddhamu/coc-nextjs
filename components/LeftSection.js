import { Card, Col, Text,Link,Spacer, Container } from "@nextui-org/react";
import Script from 'next/script';
import { useTheme } from '@nextui-org/react'

const LeftSection = ({townHall}) => {
  const {isDark} = useTheme();
  return (
    <>
      <main className='flex flex-grow flex-col p-6 md:p-3 gap-2'>
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
        <Card variant="bordered" className=" flex flex-col items-center max-h-96 min-h-72 w-full mt-4 rounded-3xl">
          <div className={`overflow-y-scroll scrollbar-hide w-full scale-105 ${isDark ? "innerBottomShadowBlack" : "innerBottomShadowWhite"}`}>
          <a class="twitter-timeline" data-theme={isDark ? "dark" : "light"} href="https://twitter.com/ClashofClans?ref_src=twsrc%5Etfw">Tweets by ClashofClans</a> <Script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
          </div>
        </Card>
      </main>
    </>
  );
}

export default LeftSection;