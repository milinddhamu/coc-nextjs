import Image from "next/image";
import swordLoader from "@/public/assets/swordLoader.gif"

const Loading = () => {
  return (
    <>
      <div className="flex min-h-screen min-w-screen justify-center items-center bg-blur-md bg-black/20">
      <Image 
      src={swordLoader}
      width={50}
      height={50}
      className=""
      alt="sword loader"
      />
      </div>
    </>
  );
}

export default Loading;