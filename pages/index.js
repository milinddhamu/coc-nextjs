import { Navbar, Button,Grid,Badge,Row,Col, Link,Spacer, Text, Card, Radio, Switch } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import "@theme-toggles/react/css/Classic.css"
import { motion,AnimatePresence,useAnimation } from "framer-motion";
import RevealText from "@/utils/RevealText";
import { useState, useEffect } from "react";
import {useRouter} from "next/router"
import axios from "axios";
import IndexCaraousal from "@/components/IndexCaraousal";
import { useRecoilState } from 'recoil';
import { locationsState, userState } from "@/recoil/storage";
import { useSession } from "next-auth/react";
import Footer from "@/utils/Footer";
import GlobalChat from "@/components/GlobalChat";
import { GoArrowSwitch } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";

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

  const handleCompareCard = () => router.push("/compareplayers");
  const handleSearchCard = () => router.push("/player");
  const cardData = [
    {
      key: 'search-card',
      className: 'group threeDShadowLight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-300/80 via-violet-600/80 to-violet-900 border-none rounded-[20px]',
      onPress: handleSearchCard,
      headerText: 'Search for profile',
      subHeaderText: 'Enter your clan or profile tag',
      imageSrc: '/assets/backgroundPng/MagicWardenCropped.png',
      altText: 'Search card bg',
      icon:<IoSearchSharp />
    },
    {
      key: 'compare-card',
      className: 'group threeDShadowLight bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-300/80 via-emerald-600/80 to-emerald-900 border-none rounded-[20px]',
      onPress: handleCompareCard,
      headerText: 'Compare profile',
      subHeaderText: 'Enter two tags to compare',
      imageSrc: '/assets/backgroundPng/shadowRcCropped.png',
      altText: 'compare card bg',
      icon:<GoArrowSwitch />
    },
  ];
  return (
    <>

      {(loader) ? <div className="flex justify-center items-center h-screen w-screen">
        <div className="relative">
          <RevealText text={paragraphText3} delay={1} className="absolute" />
        </div>
      </div> :
        <>
          <main className="relative transition-all pt-6">
            <section className="flex flex-col items-center justify-center px-4">
              <div className="flex flex-col-reverse">
            <motion.div 
              initial={{
                opacity: 0,
                scale: 0.9,
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
              className={`z-10 gap-4 max-w-5xl flex flex-col md:flex-row rounded-3xl p-6 backdrop-blur-[4px] ${isDark ? "bg-gray-500/10 threeDShadowDark" : "bg-gray-500/10 threeDShadowLight"}`}>
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
                    <Text className="text-justify" css={{ ml: "$4" }}>Monitor your clan's performance, such as its members, clan level, top members with war stars , etc.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="warning" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Compare your performance with other players and clans to stay competitive.</Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="secondary" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Analyze your attack and defense strategies to enhance your gameplay.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  <Grid xs={12} alignItems="center">
                    <Badge color="success" variant="dot" />
                    <Text className="text-justify" css={{ ml: "$4" }}>Keep track of your progress over time with historical data and trends.<p className="text-violet-500 text-xs">coming soon ...</p></Text>
                  </Grid>
                  </Grid.Container>

        </motion.div>
        <Spacer y={1.5}/>
            <div className="flex flex-col sm:flex-row gap-6">
            {cardData.map((data) => (
        <Card
          key={data.key}
          isPressable
          className={data.className}
          onPress={data.onPress}
        >
          <Card.Header css={{ position: 'absolute', zIndex: 1, bottom: 0 }} className="px-4">
           
            <Col>
              <Text size={15} weight="black" className="group-hover:tracking-[.27rem] transition-all duration-200 ease-in" transform="uppercase" css={{ letterSpacing: '0.1rem' }} color="#ffffff">
                {data.headerText}
              </Text>
              <Text size={12} color="#ffffffAA" weight="semibold" transform="uppercase" css={{ letterSpacing: '0.08rem' }}>
                {data.subHeaderText}
              </Text>
            </Col>
            <Col className="max-w-fit">
            <Row justify="flex-end">
            <div className="text-2xl text-white pt-2">{data.icon}</div>
            </Row>
            </Col>
          </Card.Header>
          <Card.Image
            src={data.imageSrc}
            objectFit="cover"
            width="100%"
            className="opacity-75 group-hover:brightness-50 group-hover:scale-105 group-hover:blur-sm group-hover:bg-black/30 transition-all ease-in duration-200"
            height={140}
            alt={data.altText}
          />
        </Card>
      ))}
            </div>

            </div>
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

// export async function getServerSideProps() {
//   const locationId = 32000113;
//   const limit = 10;
//   const endpoints = [
//     'players',
//     'clans',
//     'clans-versus',
//     'players-versus',
//     'capitals',
//   ];

//   // Create an array of promises for each endpoint request
//   const requests = endpoints.map(async (endpoint) => {
//     const url = `https://cocproxy.royaleapi.dev/v1/locations/${locationId}/rankings/${endpoint}?limit=${limit}`;
//     const options = {
//       method: 'GET',
//       url,
//       headers: {
//         Authorization: `Bearer ${process.env.COC_API}`
//       }
//     };

//     try {
//       const response = await axios.request(options);
//       return { [endpoint]: response.data };
//     } catch (error) {
//       console.error(`Error fetching data for endpoint "${endpoint}":`, error);
//       return { [endpoint]: null };
//     }
//   });

//   // Add request for the locations endpoint
//   const locationsUrl = `https://cocproxy.royaleapi.dev/v1/locations`;
//   const locationsOptions = {
//     method: 'GET',
//     url: locationsUrl,
//     headers: {
//       Authorization: `Bearer ${process.env.COC_API}`
//     }
//   };

//   // Add the location request to the array of promises
//   requests.push(
//     axios
//       .request(locationsOptions)
//       .then((response) => ({ locations: response.data }))
//       .catch((error) => {
//         console.error('Error fetching data for locations:', error);
//         return { locations: null };
//       })
//   );

//   // Use Promise.all to wait for all requests to complete
//   const results = await Promise.all(requests);

//   // Combine the results into a single data object
//   const data = results.reduce((acc, result) => ({ ...acc, ...result }), {});

//   return {
//     props: {
//       data,
//     },
//   };
// }

export async function getServerSideProps() {
  const locationId = 32000113;
  const limit = 10;
  const endpoints = [
    'players',
    'clans',
    'clans-builder-base',
    'players-builder-base',
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