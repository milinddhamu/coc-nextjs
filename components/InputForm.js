import { Input, Card, Text, Button, useTheme, Switch, Grid, Row, Container, Spacer, Loading } from "@nextui-org/react";
import { Search, User, People } from "react-iconly";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


const InputForm = () => {
  const { theme } = useTheme();
  const { isDark, type } = useTheme();
  const [toggle, setToggle] = useState(true);
  const [playerInfo, setPlayerInfo] = useState('');
  const [clanInfo, setClanInfo] = useState('');
  const router = useRouter();
  const [buttonLoader, setButtonLoader] = useState(false)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSubmit();
    }
  };
  const handleKeyDownClan = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSubmitClan();
    };
  };
  
  const handleChange = (e) => setPlayerInfo(e.target.value);
  const handleSubmit = () => {
    (playerInfo) ? (router.push(`./playerData/${playerInfo}`, undefined, { shallow: true }), setButtonLoader(true)
    ) : (toast.warn('Please enter your tag'))
  };
  const handleChangeClan = (e) => setClanInfo(e.target.value);
  const handleSubmitClan = () => {
    (clanInfo) ? (router.push(`./clanData/${clanInfo}`, undefined, { shallow: true }), setButtonLoader(true)) : (toast.warn('Please enter clan tag'))
  };

  return (
    <>
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
      <span className="flex flex-col bg-black/40 backdrop-blur-lg rounded-3xl drop-shadow-lg items-center p-6">
        <Text
          h1
          shadow='primary'
          size={35}
          weight='extrabold'
          className={`bg-gradient-to-r from-lime-400 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg animate-text`}
          aria-label="welcome"
        >Welcome Chief !</Text>
        <Spacer y={1} />
        <Container>
          <Card
            className='flex flex-row justify-around items-center py-2 pb-3 border-transparent'
          >
            <Text
              size={16}
              color="warning"
              className=""
            >Clan Tag</Text>
            <Switch
              bordered
              size='lg'
              flat="true"
              color="warning" checked={toggle}
              iconOn={<User set="bold" primaryColor={isDark ? "white" : "black"} />}
              iconOff={<People set="bold" primaryColor="#F5A524" />}
              onChange={() => setToggle(!toggle)}
              className=""
            />
            <Text
              size={16}
              color="warning"
              className="drop-shadow-lg shadow-amber-600"
            >Player Tag</Text>
          </Card>
          <Text weight="hairline" size={10} className="uppercase pt-1 text-center text-white">click to switch between player/clan tag</Text>
        </Container>
        <Spacer y={1} />
        <h1>{toggle}</h1>
        {(toggle) ? <Container key='player input' className="flex flex-col sm:flex-row items-center justify-center">
          <Input
            size='lg'
            labelLeft="#"
            placeholder="2LQUJU9YC"
            className="font-bold drop-shadow-md w-full sm:min-w-max"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="taginputplayer"
          />
          <Spacer y={1} />
          {(buttonLoader) ?
            <Button disabled auto bordered color="secondary" css={{ px: "$16" }} size="md" className=" w-full sm:max-w-min">
              <Loading type="spinner" color="currentColor" size="md" />
            </Button> :
            <Button
              type="submit"
              size='md'
              color='warning'
              className="bg-gradient-to-br from-amber-200 to-yellow-500 font-semibold text-md drop-shadow-md w-full sm:max-w-min"
              iconRight={<Search fill="currentColor" size={20} />} auto
              onPress={handleSubmit}
              aria-label="searchplayer"
            // onClick={(e)=> router.push(`./clashData/${playerInfo}` , undefined , {shallow : true})}
            >
              Search
            </Button>
          }
        </Container> :
          <Container className="flex flex-col sm:flex-row items-center justify-center">
            <Input
              size='lg'
              labelLeft="#"
              placeholder="2LQUJU9YC"
              className="flex font-bold drop-shadow-md w-full sm:min-w-max"
              onKeyDown={handleKeyDownClan}
              onChange={handleChangeClan}
            />
            <Spacer y={1} />

            {(buttonLoader) ?
              <Button disabled auto bordered color="secondary" css={{ px: "$16" }} size="md" className=" w-full sm:max-w-min">
                <Loading type="spinner" color="currentColor" size="md" />
              </Button> :
              <Button
                size='md'
                type="submit"
                color='warning'
                className="flex bg-gradient-to-br from-amber-200 to-yellow-500
          font-semibold text-md drop-shadow-md w-full sm:max-w-min"
                iconRight={<Search fill="currentColor" size={20} />}
                auto
                onPress={handleSubmitClan}
              >
                Search
              </Button>
            }
          </Container>}


        <Spacer y={1} />
      </span>
            
    </>
  );
}

export default InputForm;