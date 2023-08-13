import '@/styles/globals.css'
import { NextUIProvider, createTheme, Text, Button, Switch } from '@nextui-org/react';
import { Raleway } from 'next/font/google'
import { Gasoek_One } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import { Lilita_One } from "next/font/google"
import cocLogo from '/public/assets/others/cocLogo.png'
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from "next-auth/react"
const gasoekOne = Gasoek_One({weight: '400',
subsets: ['latin'],})
const lilitaOne = Lilita_One({weight: '400',
subsets: ['latin'],})


const lightTheme = createTheme({
  type: 'light',
  font: {},
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',
      //semantic colors (light)
      blue50: '#EDF5FF',
      // ...
      blue900: '#00254D',
      // ...

      // brand colors, // commonly used for text inside the component
      primary: '#0072F5',
      secondary: '#9750DD',
      success: '#17C964',
      warning: '#F5A524',
      error: '#F31260',

    },
  }
})

const darkTheme = createTheme({
  type: 'dark',
  font: {},
  theme: {
    colors: {
      // generic colors
      white: '#ffffff',
      black: '#000000',
      //semantic colors (light)
      blue50: '#EDF5FF',
      // ...
      blue900: '#00254D',
      // ...

      // brand colors, // commonly used for text inside the component
      primary: '#0072F5',
      secondary: '#9750DD',
      success: '#17C964',
      warning: '#F5A524',
      error: '#F31260',

    },
  }
})

const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '500'], style: ['italic', 'normal'] })


export default function App({ Component, pageProps,session }) {

  return (
    <SessionProvider session={session}>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
      >
      <NextUIProvider>
      <> 
        <Component {...pageProps} />
        </>
      </NextUIProvider>
    </NextThemesProvider>
    </SessionProvider>

  )

}
