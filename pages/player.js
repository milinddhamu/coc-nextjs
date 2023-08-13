import InputForm from '@/components/InputForm';
import Image from 'next/image';
import { Navbar, Button, Link, Text, Card, Radio, Switch } from "@nextui-org/react";
import backGround from '@/public/cocbackground.png'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme } from '@nextui-org/react'
import { Classic, Lightbulb } from '@theme-toggles/react';
import "@theme-toggles/react/css/Lightbulb.css"
import { useState, useEffect } from 'react';
import NavbarMain from '@/components/NavbarMain';

const player = () => {
  const [isToggled, setToggle] = useState(false)
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <main className='relative flex flex-col min-w-screen min-h-screen overflow-hidden top-0'>
      <NavbarMain />
        <div className='absolute flex h-screen w-screen'>
        <Image
              onLoadingComplete={() => setIsLoading(false)}
              src={backGround}
              alt="background"
              style={{objectFit: "cover"}}
              className={`
              duration-700 ease-in-out 
               ${isLoading
                  ? "scale-125 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
                })`}
            />
        </div>
        <div className='flex flex-col min-h-screen w-screen justify-center items-center overflow-hidden'>
          <InputForm />
        </div>
      </main>
    </>

  );
}

export default player;