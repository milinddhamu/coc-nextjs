import { Navbar, Button,Grid,Badge,Row,Col, Link,Spacer, Text, Card, Radio, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import "@theme-toggles/react/css/Classic.css"
import { motion,AnimatePresence,useAnimation   } from "framer-motion";
import RevealText from "@/utils/RevealText";
import { useState, useEffect } from "react";
import NavbarMain from "@/components/NavbarMain";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { GoArrowUpRight } from "react-icons/go";
import {useRouter} from "next/router"
import axios from "axios";
import IndexCaraousal from "@/components/IndexCaraousal";
import { useRecoilState } from 'recoil';
import { userState } from "@/recoil/storage";
import { useSession } from "next-auth/react";

export default function Home({data}) {
  const {data:session} = useSession;
  const [user , setUser ] = useRecoilState(userState);

  const controls = useAnimation();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 1.5, type: "spring", stiffness: 100, damping: 20 }
        });
      }
    });

    const target = document.querySelector("#image-container");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [controls]);

  const router = useRouter()
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 500)
  }, [])

  const gradientColorMarquee = isDark ? [0, 0, 0] : [255, 255, 255] 
  return (
    <>

      {(loader) ? <div className="flex justify-center items-center h-screen w-screen">
        <div className="relative">
          <RevealText text={paragraphText3} delay={1} className="absolute" />
        </div>
      </div> :
        <>
          <NavbarMain />
          <main className="relative transition-all max-h-screen">
            <div className="pt-3 flex flex-row cursor-pointer" onClick={()=>router.push("/player")}>
              <div className="flex flex-row min-w-fit px-2">
              <Image 
              src="/assets/others/Trophy.png"
              alt="trophyIcon 1"
              height={20}
              width={25} 
              />
              <Spacer />
              <Text weight="semibold" >Global</Text>
              </div>
              <Marquee gradient speed={35} direction="right" loop={0} autoFill gradientColor={gradientColorMarquee}>
              <Text h2 b> Hello - 1248 trophies </Text>
              <Text h2> Brother - 1000 trophies </Text>
              <Text h2> asjdgb - 23423 trophies </Text>
              </Marquee>
            </div>
            <div className="pt-3 flex flex-row">
              <div className="flex flex-row min-w-fit px-2">
              <Image 
              src="/assets/others/Trophy.png"
              alt="trophyIcon 2"
              height={20}
              width={25}
              />
              <Spacer />
              <Text weight="semibold">Global</Text>
              </div>
              <Marquee gradient speed={20} loop={0} autoFill gradientColor={gradientColorMarquee}>
              <Text h2 b> Hello - 1248 trophies </Text>
              <Text h2> Brother - 1000 trophies </Text>
              <Text h2> asjdgb - 23423 trophies </Text>
              </Marquee>
            </div>
            <div className="pt-3 flex flex-row">
              <div className="flex flex-row min-w-fit px-2">
              <Image 
              src="/assets/others/Trophy.png"
              alt="trophyIcon 3"
              height={20}
              width={25}
              />
              <Spacer />
              <Text weight="semibold">Global</Text>
              </div>
              <Marquee pauseOnHover gradient loop={0} autoFill gradientColor={gradientColorMarquee}>
              <Text h2 b> Hello - 1248 trophies </Text>
              <Text h2> Brother - 1000 trophies </Text>
              <Text h2> asjdgb - 23423 trophies </Text>
              </Marquee>
            </div>


            <section className="flex flex-col items-center justify-center pt-3">
            <motion.div 
            initial={{
              opacity: 0,
              scale: 1,
              filter: "blur(7px)",
            }}
            transition={{
              duration: 0.3,
              delay:0,
              ease:"circOut",
              stiffness:50
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            className={`z-10 max-w-6xl gap-4 flex flex-col md:flex-row rounded-xl mx-4 p-6 backdrop-blur-[4px] ${isDark ? "bg-black/50" : "bg-white/50"} border-[0.5px] border-slate-400/30`}>
                <Grid.Container>
                  <Grid>
                  <Text h2 weight="semibold" className="text-justify">Track and analyze your progress in Clash of Clans with ease. Simply enter your player tag or clan tag in the form below to retrieve valuable insights and statistics.</Text>
                  <Spacer />
                  </Grid>
                  <Grid>
                  <Text h2 >With our Profile Tracker, you can:</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="error" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>View your player profile information, including your level, trophies, and achievements.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="primary" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Monitor your clan's performance, such as its members, clan level, and war log.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="secondary" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Analyze your attack and defense strategies to enhance your gameplay.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="success" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Keep track of your progress over time with historical data and trends.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="warning" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Compare your performance with other players and clans to stay competitive.</Text>
                  </Grid>
                  <Spacer />
                  <Grid>
                    <Text weight="hairline" className="text-justify">
                    Our Profile Tracker provides you with up-to-date and accurate information directly from the official Clash of Clans API. Join thousands of Clashers who rely on our tool to stay informed and improve their game.
                    </Text>
                  </Grid>
                </Grid.Container>
                <div className="flex md:border-r-[.5px] border-b-[.5px] border-slate-400/30 mx-1"></div>
                <Grid.Container gap={1} className="relative">
                  <Grid xs={12} alignItems="start">
                  <Text className="text-justify z-10" weight="hairline">
                  Start tracking your Clash of Clans progress today and dominate the battlefield like never before. Join the ranks of the strongest clans and become a legendary player. Let's clash on!
                  </Text>
                  </Grid>
                  <Grid xs={12} alignItems="end" className="-mb-8 -mt-8">
                     <div className="grid grid-cols-3 justify-between gap-3 items-center">
                     <motion.div
                        id="image-container"
                        className="relative col-span-2"
                        style={{ width: "250px", height: "250px" }} // Adjust width and height as needed
                        initial={{ y: -150, opacity: 0 }}
                        animate={controls}
                      >
                        <motion.img
                          className="absolute inset-0 object-cover motion-safe:animate-bounce-slow"
                          src="/assets/backgroundPng/MagicWarden.png"
                          alt="Warden Skin"
                        />
                      </motion.div>
                    <Text weight="bold" className="text-center">
                    Uncover your Clash of Clans profile! Use the search button to access your game stats and history.
                    </Text>
                    </div>
                    </Grid>
                  <Grid xs={12} alignItems="end" justify="flex-end" className="overflow-hidden">
                  <Button shadow color="secondary" className="bg-gradient-to-tr from-violet-800 via-violet-600 to-yellow-200 animate-text m-2 w-full" auto onPress={()=> router.push("/player")}>
                  <Text weight="hairline">Search Player/Clan</Text>
                  </Button>
                  </Grid>
                </Grid.Container>
            </motion.div>
            <Text weight="hairline" className="p-6 text-justify">
            We're dedicated to continuously improving our Profile Tracker to meet the needs of Clash of Clans players like you. Stay tuned for exciting updates and new features!
            </Text>
            </section>
            <Spacer y={1}/>
            {data && 
          <IndexCaraousal data={data} /> }
          </main>
        </>}

    </>
  )
}

export async function getServerSideProps() {
  const locationId = 32000113;
  const limit = 10;
  const endpoints = [
    'players',
    'clans',
    'clans-versus',
    'players-versus',
    'capitals',
  ];

  const data = {};

  for (const endpoint of endpoints) {
    const url = `https://cocproxy.royaleapi.dev/v1/locations/${locationId}/rankings/${endpoint}?limit=${limit}`;
    const options = {
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${process.env.COC_API}`
      }
    };

    try {
      const response = await axios.request(options);
      data[endpoint] = response.data;
    } catch (error) {
      console.error(`Error fetching data for endpoint "${endpoint}":`, error);
      data[endpoint] = null;
    }
  }
  return {
    props: {
      data,
    },
  };
}
