import { Navbar, Button,Grid,Badge,Row,Col, Link,Spacer, Text, Card, Radio, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import "@theme-toggles/react/css/Classic.css"
import { motion,AnimatePresence,useAnimation } from "framer-motion";
import RevealText from "@/utils/RevealText";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { GoArrowUpRight } from "react-icons/go";
import {useRouter} from "next/router"
import axios from "axios";
import IndexCaraousal from "@/components/IndexCaraousal";
import { useRecoilState } from 'recoil';
import { locationsState, userState } from "@/recoil/storage";
import { useSession } from "next-auth/react";
import Footer from "@/utils/Footer";
import GlobalChat from "@/components/GlobalChat";

export default function Home({data}) {
  const {data:session} = useSession;
  const [user , setUser ] = useRecoilState(userState);
  const [locations , setLocations ] = useRecoilState(locationsState);

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
          <main className="relative transition-all">
            <div className="flex flex-row cursor-pointer pb-2 pt-1">
              <Marquee gradient speed={80} direction="left" loop={0} autoFill gradientColor={gradientColorMarquee}>
              <Text size={86} h1 weight="black" css={{lineHeight:"0.75",opacity:"0.4"}}>&nbsp;CLASH&nbsp;OF&nbsp;CLANS&nbsp;PROFILE&nbsp;TRACKER&nbsp;</Text>
              </Marquee>
            </div>
            <section className="flex flex-col items-center justify-center px-4">
              <motion.div 
              initial={{
                opacity: 0,
                scale: 1.2,
                filter: "blur(7px)",
              }}
              transition={{
                duration: 0.3,
                delay:0,
                ease:"easeIn",
                stiffness:50
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              className={`z-10 gap-4 max-w-8xl flex flex-col md:flex-row rounded-3xl p-6 backdrop-blur-[4px] ${isDark ? "bg-gray-500/10 threeDShadowDark" : "bg-gray-500/10 threeDShadowLight"}`}>
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
                    <Text className="text-justify" css={{ ml: "$4" }}>Analyze your attack and defense strategies to enhance your gameplay.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="success" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Keep track of your progress over time with historical data and trends.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="warning" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Compare your performance with other players and clans to stay competitive.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  <Spacer />
                  <Grid>
                    <Text weight="thin" className="text-justify">
                    Our Profile Tracker provides you with up-to-date and accurate information directly from the official Clash of Clans API. Join thousands of Clashers who rely on our tool to stay informed and improve their game.
                    </Text>
                  </Grid>
                </Grid.Container>
                <div className="flex md:border-r-[.5px] border-b-[.5px] border-slate-400/30 mx-1"></div>
                <Grid.Container gap={1} className="relative">
                  <Grid xs={12} alignItems="start">
                  <Text className="text-justify" weight="thin">
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
                  <Button color="secondary" className="bg-gradient-to-tr from-violet-800 via-violet-600 to-yellow-200 animate-text m-2 w-full" auto onPress={()=> router.push("/player")}>
                  <Text css={{letterSpacing:"0.02rem"}}>Search Player/Clan</Text>
                  </Button>
                  </Grid>
                </Grid.Container>
              </motion.div>
              <Text weight="thin" className="p-6 text-justify">
              We're dedicated to continuously improving our Profile Tracker to meet the needs of Clash of Clans players like you. Stay tuned for exciting updates and new features!
              </Text>
              </section>
          
            <Spacer y={1}/>
            <div className="flex flex-col sm:flex-row justify-center w-full px-4 gap-2 sm:gap-12 transition-all duration-500 ">
              <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-start items-start coc-text"> 
              <Text weight="extrabold" css={{
                      textGradient: "0deg, $yellow400 -20%, $yellow700 100%",
                      lineHeight: "1.25"
                  }} size={50}>
                GLOBAL
              </Text>
              <Text weight="extrabold" css={{
                      textGradient: "0deg, $yellow400 -20%, $yellow700 100%",
                      lineHeight: "1.25"
                  }} size={50}>
                CHAT
              </Text>
            </div>
            </div>
            <GlobalChat />

            </div>
            <Spacer y={1}/>
            {data && 
          <IndexCaraousal data={data} />
          }
          <Footer />
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

  // Create an array of promises for each endpoint request
  const requests = endpoints.map(async (endpoint) => {
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
      return { [endpoint]: response.data };
    } catch (error) {
      console.error(`Error fetching data for endpoint "${endpoint}":`, error);
      return { [endpoint]: null };
    }
  });

  // Add request for the locations endpoint
  const locationsUrl = `https://cocproxy.royaleapi.dev/v1/locations`;
  const locationsOptions = {
    method: 'GET',
    url: locationsUrl,
    headers: {
      Authorization: `Bearer ${process.env.COC_API}`
    }
  };

  // Add the location request to the array of promises
  requests.push(
    axios
      .request(locationsOptions)
      .then((response) => ({ locations: response.data }))
      .catch((error) => {
        console.error('Error fetching data for locations:', error);
        return { locations: null };
      })
  );

  // Use Promise.all to wait for all requests to complete
  const results = await Promise.all(requests);

  // Combine the results into a single data object
  const data = results.reduce((acc, result) => ({ ...acc, ...result }), {});

  return {
    props: {
      data,
    },
  };
}
