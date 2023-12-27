import axios from 'axios';
import CompareMainComponent from "@/components/CompareMainComponent";
import { useState } from 'react';
const CompareTags = ({data}) => {
  const [playerOneData , setPlayerOneData] = useState(()=> data && data[0])
  const [playerTwoData , setPlayerTwoData] = useState(()=> data && data[1]);


  return (
    <>
    {data ?
    <CompareMainComponent playerOneData={playerOneData} playerTwoData={playerTwoData}/> : 
    <div className="flex justify-center items-center w-full h-screen">
    <h1>API is not working...</h1>
    </div> }
    </>
  );
}



export async function getServerSideProps(context) {
  const { compareTags } = context.query;

  if (!compareTags) {
    return {
      props: {
        data: null,
      },
    };
  }

  const [playerOne, playerTwo] = compareTags.split('-');
  console.log(playerOne);

  const apiUrls = [
    `https://api.clashofclans.com/v1/players/%23${playerOne}`,
    `https://api.clashofclans.com/v1/players/%23${playerTwo}`,
  ];

  const axiosRequests = apiUrls.map((url) =>
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.COC_API}`,
      },
    })
  );

  try {
    const responses = await Promise.all(axiosRequests);
    const data = responses.map((response) => response.data);

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


export default CompareTags;