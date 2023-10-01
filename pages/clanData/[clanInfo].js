import axios from "axios";
import ClanMainInfo from "@/components/ClanMainInfo";
import { useState, useEffect } from 'react';
import { Text, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import Loading from "@/utils/Loading"

const ClanInfo = ({ data }) => {
  const router = useRouter();
  console.log(data)
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

export async function getServerSideProps(context) {
  const { clanInfo } = context.query;
  const options = {
    method: 'GET',
    url: `http://localhost:${process.env.PORT || 3000}/api/clanDatabase/${clanInfo}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    context.res.setHeader('Cache-Control', 'no-store');
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: { data: null },
    }
  }
}


export default ClanInfo;

