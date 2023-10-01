import PlayerProfile from "@/components/PlayerProfile";
import axios from "axios";
import { Card, Container, Text, Row, Col, User, Avatar, Button, Navbar, Switch } from '@nextui-org/react'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from "next/router";
import Loading from "@/utils/Loading"
const PlayerInfo = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const [fetchedData, setFetchedData] = useState(data);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false);
    },1500)    
  }, []);
  if (loading) {
    return <Loading />;
    }
  return (
    <>
    <PlayerProfile allData={fetchedData} />
    {/* {fetchedData ?  
      <PlayerProfile allData={fetchedData} /> 
      : 
      <div className="flex min-h-screen min-w-screen items-center justify-center"><Text>Api is not working</Text></div> 
    } */}
  </>
  );
}

export async function getServerSideProps(context) {
  const { playerInfo } = context.query;

  const options = {
    method: 'GET',
    url: `http://localhost:${process.env.PORT || 3000}/api/playerDatabase/${playerInfo}`,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    context.res.setHeader('Cache-Control', 'no-store');
      return {
      props: {
      data,
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


export default PlayerInfo;

