import { useState } from "react";
import { Input, Card, Text, Button, useTheme, Switch, Grid, Row, Container, Spacer, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const compareplayers = () => {
  const [playerOne , setPlayerOne] = useState("");
  const [playerTwo , setPlayerTwo] = useState("");
  const handleChangePlayerOne = (e) => setPlayerOne(e.target.value);
  const handleChangePlayerTwo = (e) => setPlayerTwo(e.target.value);
  const router = useRouter();

  const handleSubmit = () => {
    if (playerOne && playerTwo) {
      const compareTags = [playerOne.replace("#",""), playerTwo.replace("#","")];
      router.push(`./compareProfile/${compareTags.join('-')}`, undefined, { shallow: true });
    } else {
      toast.warn('Please enter clan tags');
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen max-h-5xl gap-4">
      <div className="flex flex-col gap-4">
      <Input
            size='lg'
            labelLeft="#"
            key="playerone"
            id="playerone"
            placeholder="First player tag"
            className="font-bold drop-shadow-md w-full sm:min-w-max"
            onChange={handleChangePlayerOne}
            aria-label="taginputplayerone"
          />
      <Input
            size='lg'
            labelLeft="#"
            key="playertwo"
            id="playertwo"
            placeholder="Second player tag"
            className="font-bold drop-shadow-md w-full sm:min-w-max"
            onChange={handleChangePlayerTwo}
            aria-label="taginputplayertwo"
          />
      </div>
            <Button 
              size='md'
              color='warning' auto
              bordered
              onPress={handleSubmit}
              >Compare</Button>

<ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default compareplayers;