import axios from "axios";
import ClanMainInfo from "@/components/ClanMainInfo";
import { useState, useEffect } from 'react';
import { Text, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import Loading from "@/utils/Loading"

const ClanInfo = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    setFetchedData(data)
    setTimeout(()=>{
      setLoading(false);
    },1500)    
  }, []);
  if (loading) {
    return <Loading />
  } 
  
  return (
    <>  {fetchedData ?         <ClanMainInfo allData={fetchedData} />
  :<div className="flex min-h-screen min-w-screen items-center justify-center"><Text>Api is not working</Text></div>  }    
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { clanInfo } = context.query;
//   const options = {
//     method: 'GET',
//     url: `http://localhost:${process.env.PORT || 3000}/api/clanDatabase/${clanInfo}`,
//   };

//   try {
//     const response = await axios.request(options);
//     const data = response.data;
//     context.res.setHeader('Cache-Control', 'no-store');
//     return {
//       props: {
//         data,
//       },
//     }
//   } catch (error) {
//     return {
//       props: { data: null },
//     }
//   }
// }

export async function getServerSideProps(context) {
  const { clanInfo } = context.params;

  const clanApiUrl = `https://cocproxy.royaleapi.dev/v1/clans/%23${clanInfo}`;
  const clanOptions = {
    method: 'GET',
    url: clanApiUrl,
    headers: {
      Authorization: `Bearer ${process.env.COC_API}`,
    },
  };

  try {
    const clanResponse = await axios.request(clanOptions);
    const clanData = clanResponse.data;
    const memberTags = clanData.memberList.map((member) => member.tag.replace('#', ''));

    const playerDataPromises = memberTags.map(async (tag) => {
      const playerApiUrl = `https://cocproxy.royaleapi.dev/v1/players/%23${tag}`;
      const playerOptions = {
        method: 'GET',
        url: playerApiUrl,
        headers: {
          Authorization: `Bearer ${process.env.COC_API}`,
        },
      };
      const playerResponse = await axios.request(playerOptions);
      return playerResponse.data;
    });

    const playerData = await Promise.all(playerDataPromises);

    const responseData = {
      clan: clanData,
      players: playerData,
    };

    return {
      props: {
        data: responseData,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}



export default ClanInfo;

