import { Card, Col, Text, Spacer, Button, Row, Image, Badge } from "@nextui-org/react";
import { motion, animate, useMotionValue, useMotionTemplate } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/router";


const CaraousalInfo = ({ allData, index, endpoint }) => {
  const router = useRouter();
  const textVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
  };
  const tag = allData?.tag.replace("#", "")
  function getDataByEndpoint(endpoint) {
    let data = {
      image: '',
      trophies: [],
    };

    switch (endpoint) {
      case 'Player Rankings':
        data.image = allData?.league.iconUrls.tiny;
        data.trophies = allData?.trophies;
        break;
      case 'Player Rankings Versus':
        data.image = "/assets/Builder_Base_Diamond_League_1.png";
        data.trophies = allData?.builderBaseTrophies;
        break;
      case 'Clan Rankings':
        data.image = allData?.badgeUrls.small;
        data.trophies = allData?.clanPoints;
        break;
      case 'Clan Rankings Versus':
        data.image = allData?.badgeUrls.small;
        data.trophies = allData?.clanVersusPoints;
        break;
      case 'Clan Capital Rankings':
        data.image = allData?.badgeUrls.small;
        data.trophies = allData?.clanCapitalPoints;
        break;
      default:
        data.image = "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png";
        data.trophies = 4999;
        break;
    }

    return data;
  }

  // Example usage within a component
  const endpointData = getDataByEndpoint(endpoint);

  const handleVisitSubmit = () => {
    (endpoint === "Player Rankings" || endpoint === "Player Rankings Versus") ? (router.push(`/playerData/${tag}`)) : (router.push(`/clanData/${tag}`))

  }

  return (
    <>
      <Row align="center">
        <Col span={1}>
          <Text>{index} .</Text>
        </Col>
        <Col span={1}>
          <Image
            src={endpointData.image}
            alt="league"
            height={24}
            width={24}
          />
        </Col>
        {/* <Col span={2}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-row justify-around items-center group">
              <div className='flex flex-row justify-center items-center relative'>
                <div className="opacity-0 w-full h-full absolute bg-gradient-to-bl from-gray-100 via-slate-300 to-slate-800 blur-lg animate-text rounded-full group-hover:opacity-50 transition-all duration-800 ease-linear "></div>
                <Card.Image src='/assets/others/XP.png' showSkeleton containerCss={{ borderRadius: "100%" }} height={20} width={20} className='drop-shadow-md' alt="xp" />
                <div className='absolute text-white text-xs font-extrabold drop-shadow-[0.8px_2px_0.1px_rgba(0,0,0,1)] pb-1'>{245}</div>
              </div>
            </motion.div>
            </Col> */}
        <Col span={7}>
          <div className="flex flex-col overflow-hidden line-clamp-1 ">
            <Text b size={14}>{allData?.name}</Text>
            {(endpoint === "Player Rankings" || endpoint === "Player Rankings Versus") ?
              <Text color={allData?.clan?.name ? "warning" : "error"} size={12}>{allData?.clan?.name || "not in clan"}</Text> : <Spacer y={1} />}
          </div>
        </Col>
        <Col span={2}>
          <div className="flex flex-row items-center">
            <Image
              src='/assets/others/Trophy.png'
              alt={"trophy"}
              height={24}
              width={24}
              quality={30}
              className="cursor-pointer transition-all ease-linear absolute z-40"
            />
            <Spacer />
            <Badge
              size='md'
              color="warning"
              className="relative z-0"
              variant="flat"
              isSquared
              css={{
                minWidth: '20px',
                border: "none",
              }}
            >
              {endpointData?.trophies}
            </Badge>
          </div>
        </Col>
        <Col span={1}>
          <Button auto css={{ backgroundColor: "" }} onClick={handleVisitSubmit} size="xs" flat color="success"><FiExternalLink /></Button>
        </Col>
      </Row>
    </>
  );
}

export default CaraousalInfo;