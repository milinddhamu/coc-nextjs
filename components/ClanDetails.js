import ClanMainInfo from "./ClanMainInfo";
import { Container,Card,Text,Image } from "@nextui-org/react";
import NavbarMain from "./NavbarMain";
 
const ClanDetails = ({ image , name }) => {
  return (
    <>
    <Container>
        <Card className='border-none flex flex-col justify-center items-center' css={{backgroundColor:"transparent"}}>
        <div className='flex flex-row items-center cursor-pointer hover:opacity-100 opacity-80 transition-all ease-inout hover:scale-105'>
          <Card.Image src={image || "/assets/others/clanless.png"} alt="clan logo" className='h-14 pt-2 sm:h-16 md:h-18 lg:h-22 drop-shadow-xl' />
        <Text h1
                  className="flex flex-row bg-gradient-radial from-slate-200 via-slate-500 to-slate-700 text-2xl md:text-3xl xlg:text-4xl animate-text bg-clip-text text-transparent antialiased drop-shadow-md p-2"
                  weight="extrabold">
          {name || "not in any clan"}
        </Text>
        </div>
        </Card>
      </Container>
    </>
  );
}

export default ClanDetails;