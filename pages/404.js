import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation"
const NotFound = () => {
  const router = useRouter()
  return (
    <>
    <main className="flex flex-col gap-2 w-full items-center p-6">
    <div className="flex flex-col justify-center items-center gap-6 w-full p-6 max-w-screen-md">
    <Image
      width={150}
      src="/assets/others/Villager3.png"
      alt="Villager"
      objectFit="cover"
    />
    <h1 className="text-6xl md:text-8xl font-black text-[#F31260]">404</h1>
    <h1 className="uppercase md:text-2xl text-justify">oops! the page you were looking does not exist</h1>
    </div>

    <div className="flex flex-row w-full justify-center gap-4">
            <Button
              id="home"
              auto
              bordered
              css={{borderWidth:"0.5px",borderColor:"#6b728050"}}
              color="neutral"
              onPress={()=> router.push("/")}
            >Home</Button>
            <Button
              id="home"
              auto
              bordered
              css={{borderWidth:"0.5px",borderColor:"#6b728050"}}
              color="neutral"
              onPress={()=> router.push("/player")}
            >Find Player/Clan</Button>
    </div>
    </main>
    </>
  )
}

export default NotFound;