import '@/styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil';

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


export default function App({ 
  Component,
  pageProps:{session , ...pageProps}
  }){

  return (
    <SessionProvider session={session}>
    <RecoilRoot>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
      >
      <NextUIProvider>
      
        <Component {...pageProps} />
      
      </NextUIProvider>
    </NextThemesProvider>
    </RecoilRoot>
    </SessionProvider>
   

  )

}
