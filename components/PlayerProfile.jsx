import Image from "next/image";
import { Card, Text, Col, Container, Spacer, Navbar, Button, Switch, Grid, Avatar,Link } from "@nextui-org/react";
import InfoCard from "./InfoCard";
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
import cocLogo from '/public/assets/others/cocLogo.png'
import { Lightbulb } from '@theme-toggles/react';
import "@theme-toggles/react/css/Lightbulb.css"
import NavbarMain from '@/components/NavbarMain';


const PlayerProfile = ({ allData }) => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const playerData = allData[0];
  const passData = allData[1]
  const backgroundPng = [
    {
      key: "1",
      url: '/../public/assets/backgroundPng/ApprenticeWarden.png'
    },
    {
      key: "2",
      url: '/../public/assets/backgroundPng/GoblinQueen.png'
    },
    {
      key: "3",
      url: '/../public/assets/backgroundPng/legendaryQueen.png'
    },
    {
      key: "4",
      url: '/../public/assets/backgroundPng/ElectrofireWizard.png'
    },
    {
      key: "5",
      url: '/../public/assets/backgroundPng/MagicWarden.png'
    },
    {
      key: "6",
      url: '/../public/assets/backgroundPng/LunarKing.png'
    },
    {
      key: "7",
      url: '/../public/assets/backgroundPng/shadowRc.png'
    },
    {
      key: "8",
      url: '/../public/assets/backgroundPng/SuperHogRider.png'
    }
  ]
  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];
  return (
    <>
      <NavbarMain />
      <main className="pt-4">
        {/* <div className="absolute grid grid-cols-4 gap-10 pt-14 inset-0 bg-violet-400/40 overflow-hidden blur-sm">
            <Image src={backgroundPng[0].url} height={300}
              width={300}
              alt="bg 1"
            />
            <Image src={backgroundPng[1].url}
              height={300}
              width={300}
              alt="bg 2"
            />
          
            <Image src={backgroundPng[2].url} height={300}
              width={300}
              alt="bg 3" />
            <Image src={backgroundPng[3].url} height={300}
              width={300}
              alt="bg 4" />
          
            <Image src={backgroundPng[4].url} height={300}
              width={300}
              alt="bg 5"
            />
            <Image src={backgroundPng[5].url} height={300}
              width={300}
              alt="bg 6"
            />
          
            <Image src={backgroundPng[6].url} height={300}
              width={300}
              alt="bg 7"
            />
            <Image src={backgroundPng[7].url} height={300}
              width={300}
              alt="bg 8"
              className="" />

        </div> */}
        {/* <Navbar isBordered variant="floating" height={54} css={{position:"relative"}}>
          <Navbar.Content hideIn="xs">
            <Navbar.Item>
              <Image
                alt='coc logo'
                width={50}
                height={50}
                src="/assets/others/cocLogo.png"
                className="drop-shadow-lg"
              />
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Item>
              <Navbar.Link href="/">
                Home
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item>
              <Navbar.Link href="/playerData">
                Find Profile
              </Navbar.Link>
            </Navbar.Item>
            <Navbar.Item enableCursorHighlight>
              <Lightbulb
                className="scale-150 pb-1"
                aria-label="Theme Toggle Switch"
                toggled={isDark}
                toggle={() => setTheme(!isDark ? "dark" : "light")}
              />
            </Navbar.Item>
          </Navbar.Content >
          <Navbar.Content hideIn="s">
            <Navbar.Item>
              <Image
                alt='coc logo'
                width={50}
                height={50}
                src="/assets/others/cocLogo.png"
                className="drop-shadow-lg"
              />
            </Navbar.Item>
          </Navbar.Content>
        </Navbar> */}

{/* <Navbar shouldHideOnScroll isBordered variant="floating" height={54} css={{paddingTop:"8px"}}>
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="/">
            Home
          </Navbar.Link>
          <Navbar.Item>
          <Lightbulb
                className={`scale-150 ${!isDark ? "text-yellow-500" : ""} font-bold pr-2 pb-[2px]`}
                aria-label="Theme Toggle Switch"
                toggled={isDark}
                toggle={() => setTheme(!isDark ? "dark" : "light")}
              />
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse aria-label="Collapse main" transitionMatrix css={{marginTop:"6px",padding:"20px"}} className="nav-content scrollbar-hide overflow-hidden" >
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem aria-label="Collapse item" key={item} activeColor="warning">
            <Link aria-label="Collapse link"
              color="inherit"
              css={{ minWidth: "100%",
              }}
              href="#"
            >
              <Text className="hover:underline-offset-1 hover:underline hover:translate-x-3 transition-all ease-in duration-900">
                  {item}
                </Text>
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      </Navbar> */}
          <Grid.Container gap={1} display="flex"  justify="center">
            <Grid lg={3} xs={0} justify="center">
              <LeftSection aria-label="left section" townHall={playerData?.townHallLevel}  />
            </Grid>
            <Grid lg={6} xs={12} sm={8} md={8} justify="center" >
              <InfoCard data={playerData} />
            </Grid>
            <Grid lg={3} xs={12} sm={4} md={4} justify="center" >
              <RightSection aria-label="Right section" data={passData} />
            </Grid>
          </Grid.Container>
      </main>
    </>

  );
}

export default PlayerProfile;