import axios from "axios";
import ClanMainInfo from "@/components/ClanMainInfo";
import { useState, useEffect } from 'react';
import { Text, Image } from "@nextui-org/react";
import { useRouter } from "next/router";

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
    return <h1>Loading...</h1>
  } 
  
  return (
    <>  {fetchedData ?         <ClanMainInfo allData={fetchedData} />
  :<Text>Api is not working</Text>  }    
    </>
  );
}

export async function getServerSideProps(context) {
  const { clanInfo } = context.query;
  const options = {
    method: 'GET',
    url: `http://localhost:${process.env.PORT || 3000}/clanData/${clanInfo}`,
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

