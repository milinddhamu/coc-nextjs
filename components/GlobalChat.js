import { useTheme } from '@nextui-org/react'
import { Navbar, Button,Grid,Badge,Row,Col, Link,Spacer, Text, Card, Radio, Switch } from "@nextui-org/react";


const GlobalChat = () => {
  const { isDark, type } = useTheme();
  const messages = [
    {
      user:"else",
      text:"something is cooking"
    },
    {
      user:"else",
      text:"what ??"
    },
    {
      user:"me",
      text:"december update"
    },
    {
      user:"else",
      text:"16 ?!?!"
    },
    {
      user:"else",
      text:"hello"
    },
    {
      user:"me",
      text:"hello coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"me",
      text:"why?"
    },
    {
      user:"else",
      text:"coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"else",
      text:"hello"
    },
    {
      user:"me",
      text:"hello coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"me",
      text:"why?"
    },
    {
      user:"else",
      text:"coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"else",
      text:"hello"
    },
    {
      user:"me",
      text:"hello coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"me",
      text:"why?"
    },
    {
      user:"else",
      text:"coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"else",
      text:"hello"
    },
    {
      user:"me",
      text:"hello coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"me",
      text:"why?"
    },
    {
      user:"else",
      text:"coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
    {
      user:"else",
      text:"hello"
    },
    {
      user:"me",
      text:"hello coolasdloremTempor nostrud consectetur culpa consequat.Laboris aliquip veniam elit labore et in nisi est. Magna non aliquip nostrud dolore. Labore cupidatat id nostrud nisi tempor consequat est minim ullamco quis et. Velit sint nostrud cupidatat quis aute excepteur in dolor culpa culpa minim id."
    },
  ]

  return (
    <>
      <div className={`relative flex w-full max-w-4xl h-96 rounded-3xl border-[.5px] border-zinc-500/40 overflow-hidden pointer-events-none`}>
      <div className="absolute z-20 flex w-full h-full items-center justify-center shadow-xl backdrop-blur"><Text weight="extrabold" size={28}>IN PROGRESS</Text></div>
        <div className={`flex flex-col w-full gap-3 p-4 overflow-scroll ${isDark ? "innerBottomShadowWhite":"innerBottomShadowBlack"} blur-[1px]`}>
        {messages.map((message,index)=>(
          (message.user === "else") ?
          ( <div key={index} className="flex flex-start max-w-[75%] justify-start bg-amber-500 p-1 px-2 rounded-xl">
            <Text size={16}>{message.text}</Text>
          </div> )
          :
          (<div key={index} className="self-end max-w-[75%] justify-start bg-blue-500 p-1 px-2 rounded-xl">
            <Text size={16}>{message.text}</Text>
          </div> )
          ))}
        </div>
      </div>
    </>
  );
}

export default GlobalChat;