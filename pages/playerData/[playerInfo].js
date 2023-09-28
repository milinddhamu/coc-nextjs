import PlayerProfile from "@/components/PlayerProfile";
import axios from "axios";
import { Card, Container, Text, Row, Col, User, Avatar, Button, Navbar, Switch } from '@nextui-org/react'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from "next/router";
import Loading from "@/utils/Loading"
const PlayerInfo = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    setFetchedData(data)
    setTimeout(()=>{
      setLoading(false);
    },1500)    
  }, []);
  if (loading) {
    return <Loading />;
    }
  return (
    <>{fetchedData ?  <PlayerProfile allData={fetchedData} /> : <Text>Api is not working</Text> }
  </>
  );
}

export async function getServerSideProps(context) {
  const { playerInfo } = context.query;

  const options = {
    method: 'GET',
    url: `http://localhost:${process.env.PORT || 3000}/playerDatabase/${playerInfo}`,
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

