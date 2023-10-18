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
          <Grid.Container gap={0} display="flex"  justify="center">
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