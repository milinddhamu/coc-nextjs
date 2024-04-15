import { useTheme } from '@nextui-org/react'
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { locationsState } from "@/recoil/storage";

const globalchat = ({data}) => {
  const { isDark, type } = useTheme();

  return (
    <>
    <div className="flex w-full justify-center p-4">
    <div className={`flex w-full max-w-8xl h-96 rounded-3xl border-[.5px] border-zinc-500/40 ${!isDark ? "innerBottomShadowBlack":"innerBottomShadowWhite"}`}>
    
    </div>
    </div>
    </>
  )
};

export default globalchat;

