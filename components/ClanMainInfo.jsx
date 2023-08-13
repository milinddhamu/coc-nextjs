import { Text, Image,Dropdown,Spacer,Badge,Grid,Container,Input,Switch,Card,Loading,Button } from "@nextui-org/react";
import NextImage from 'next/image';
import ClanPlayerCard from "@/utils/ClanPlayerCard";
import ClanList from "@/utils/ClanList";
import Suggestions from "@/utils/Suggestions";
import { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@nextui-org/react';
import CopyToClipboard from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import NavbarMain from "@/components/NavbarMain";
import {motion, useScroll, useTransform } from 'framer-motion';
import { ClanWarLeague } from "@/utils/Data/ClanWarLeague";
BsViewList
import { BsViewList } from "react-icons/bs";
import { RxDashboard ,RxCross1} from "react-icons/rx";
import { MdOutlineAddModerator,MdOutlineDeleteOutline } from "react-icons/md";
import {teamState} from "@/recoil/storage";
import {useRecoilValue,useResetRecoilState, useSetRecoilState} from "recoil";
import { collection, addDoc,getDocs ,serverTimestamp,doc, deleteDoc,setDoc,arrayUnion } from "firebase/firestore"; 
import { db } from "../firebase";
import {useSession} from "next-auth/react";


const ClanMainInfo = ({allData}) => {
  const [firebaseUser , setFirebaseUser] = useState("");
  const [teamName , setTeamName] = useState("");
  const [docRef , setDocRef] = useState("")
  const [teams , setTeams] = useState([]);
  const {data:session} = useSession();
  const sessionEmail = session?.user.email
  const collectionRef = collection(db, 'users');
  const handleResetTeam = useResetRecoilState(teamState);
  const teamList = useRecoilValue(teamState);
  const [cardState , setCardState] = useState(true);
  const [createState , setCreateState] = useState(false);
  let {scrollYProgress} = useScroll()
  let y = useTransform(scrollYProgress,[0,1],["0%","-50%"])
  const [isLoading, setIsLoading] = useState(true);
  const data = allData?.clan;
  const {isDark} = useTheme();
  const [input,setInput] = useState("");
  const [showsugg , setShowsugg] = useState(false)
  const [suggestions, setSuggestions] = useState([]);
  const [suggLoading , setSuggLoading ] = useState(true);
  const memberList = allData?.players?.map((item) => {
    const matchingItem = allData?.clan.memberList.find((el) => el.tag === item.tag);
    return { ...item, ...matchingItem };
  });
  const [parent, enableAnimations] = useAutoAnimate({duration:500})
  const [members , setMembers] = useState([])
  useEffect(()=>{
    getTeams();
    setMembers(memberList)
    setTimeout(()=>setIsLoading(false),1500)
  },[])
  const roleOrder = {
    "leader": 1,
    "coLeader": 2,
    "admin": 3,
    "member": 4,
  };
  const handleClose = () => {
    setCreateState(false);
    handleClickScrollTeamCancel();
  };
  const handleCreateTeam = () => {
    setCreateState(true)
    handleClickScrollTeam();
  };
  const handleMinimize = () => {
    console.log(minimised)

  };
  const handleClickScrollTeam = () => {
    const element = document.getElementById('membersScroll');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleClickScrollTeamCancel = () => {
    const element = document.getElementById('scrollMain');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const sortByRole = (a, b) => {
    const roleA = roleOrder[a.role];
    const roleB = roleOrder[b.role];
  
    if (roleA < roleB) {
      return -1;
    }
    if (roleA > roleB) {
      return 1;
    }
    return 0;
    };
  const handleSortRole = () => {
    const newMembers = [...memberList].sort(sortByRole)
    setMembers(newMembers)
  };
  const handleExpSort = () => {
    const newMembers = [...memberList].sort((a,b) => b.expLevel - a.expLevel)
    setMembers(newMembers)
  };
  const handleStarsSort = () => {
    const newMembers = [...memberList].sort((a,b) => b.warStars - a.warStars)
    setMembers(newMembers)
  };
  useEffect(() => {
      setSuggLoading(false)
    let timer;
  
    if (input.length >= 1) {
      setTimeout(()=>{
        setShowsugg(true)
      },500)
      timer = setTimeout(() => {
        const searchTerm = input.toLowerCase();
  
        // Update the member list based on the search term
        const filteredMembers = memberList.filter((member) =>
          member.name.toLowerCase().includes(searchTerm)
        );
        setMembers(filteredMembers);
  
        // Generate suggestions based on the search term
        const matchedSuggestions = memberList.filter((member) => {
          const memberName = member.name.toLowerCase();
          const searchTermLetters = searchTerm.split('');
    
          return searchTermLetters.every((letter) =>
            memberName.includes(letter)
          );
        });
  
        setSuggestions(matchedSuggestions);
      }, 300); // Set the desired delay in milliseconds
    } else {
      setMembers(memberList); // Reset the member list to the original list
      setSuggestions([]);
      setShowsugg(false)
    }
  
    return () => {
      clearTimeout(timer);
    };
  }, [input]);  
  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };
  const getUrl = ClanWarLeague.find((a)=> a.id === data?.capitalLeague?.name)?.url
  const getColor = ClanWarLeague.find((a)=> a.id === data?.capitalLeague?.name)?.color
  const handleSuggest = (a) => {
    setInput(a)
  };
  const createdTeam = members?.filter(member => teamList.includes(member.tag));
  // firebase functions

  const getTeams = async ()=>{
    try {
  const querySnapshot = await getDocs(collectionRef);
  const userDoc = querySnapshot.docs.find((doc) => {
    return doc.data().userEmail === sessionEmail;
  });
    if(userDoc){
    const userId = userDoc.id
    const user = userDoc.data()
    const teamsData = [...user.teams]
    setDocRef(userId);
    setFirebaseUser(user.userEmail);
    setTeams(teamsData);
  } else {
    throw new Error("User not found")
  }
  } catch (error) {
    console.error(error)
  }
}
const handleSubmit = async () => {
  toast(`Team ${teamName} saved successfully!`)
  if (!session) {
    return;
  }
  if(teamName.length === 0 && teamList.length > 15){
    return;
  }
  if(firebaseUser !== sessionEmail) {
    try {
      const newUser = {
        teams:[{
          clanTag:data?.tag ,
          players:teamList,
          teamName:teamName
         }],
        userName: session?.user.name,
        userEmail: session?.user.email,
        timestamp: serverTimestamp()
      };
      await addDoc(collection(db, 'users'),newUser)
      setTeamName('');
      getTeams();
      handleResetTeam()
    } catch (error) {
      // Handle error
      console.error('Error adding comment:', error);
    }
  } else {
    try {
    const userTeamsRef = doc(db, 'users',docRef);
    await setDoc(userTeamsRef,{
      teams:arrayUnion({clanTag:data?.tag ,
        players:teamList,
        teamName:teamName
    })},
      {merge: true})
    setTeamName('');
    getTeams();
    handleResetTeam() } catch (error) {
      console.error(error)
    }
  }
  

};
  return (
    <>
    <main id="scrollMain" className="flex flex-col justify-start items-center min-h-screen min-w-screen relative overflow-hidden">
    <NavbarMain />
    <section className="relative rounded-full animate-text ease-linear transition-all bg-gradient-to-l from-gray-200/10 via-gray-300/20 to-gray-400/20 px-4 flex flex-col sm:flex-row items-center justify-center min-h-30 mt-12 w-full max-w-2xl border-[.5px] border-gray-500/30 gap-2">
      <div className="relative">
      <div className={`h-full w-full ${isDark ? "bg-white" : "bg-violet-600"} rounded-full scale-75 blur-3xl absolute`}></div>
    <Image
    height={160}
    width={160}
    containerCss={{borderRadius:"50% / 0% 0% 60% 60%",padding:"0px 6px"}}
    className="relative scale-125 sm:scale-150 min-w-1/3"
    src={data?.badgeUrls.medium}
    alt="clan logo"
    />
    </div>
    <Spacer />
    <div className="flex flex-col">
    <div className="flex flex-row justify-between items-center">
    <Text weight="extrabold" className="bg-gradient-radial from-slate-200 via-slate-600 to-slate-800 text-xl md:text-2xl xlg:text-3xl bg-clip-text text-transparent drop-shadow-lg antialiased animate-text transition-all ease-linear">
    {data?.name || "dfsdfsdfsdfsdf"}
    </Text>
    <div className="flex flex-row items-center relative">
                      
                       <Image 
                          src={getUrl}
                          alt={'league'}
                          height={30}
                          width={30}
                          quality={30}
                          className="cursor-pointer transition-all ease-linear absolute top-50 right-50 z-40"/>
                          <Spacer />
                          <Badge
                            size='md'
                            color={getColor}
                            className="relative z-0"
                            variant="flat"
                            isSquared
                            css={{
                              minWidth: '100px',
                              border:"none",
                            }}
                          >
                            {data?.capitalLeague?.name}
                          </Badge>
                          </div>
    
    <CopyToClipboard text={data?.tag || "null"}>
      <div className="flex flex-row items-center gap-1 bg-gray-500/30 backdrop-blur-lg rounded-[8px] px-2">
    <LuCopy className="text-gray-500/60"/>
    <Text onClick={()=> toast(`Copied "${data?.tag}" to clipboard`)} size={12} weight="hairline" className="text-gray-500/60 cursor-pointer">
    {data?.tag || "#349857"}
    </Text>
    </div>
    </CopyToClipboard>
    </div>
    <Spacer y={.5}/>
    <Text blockquote css={{borderRadius:"8px",padding:"2px 6px",margin:"0px",overflow:"none"}} className="line-clamp-3 text-center">
    {data?.description || "-"}
    </Text>
    <Spacer y={.5}/>
    <Grid.Container gap={.5} justify="center">
      <Grid>
    <Badge css={{borderRadius:"8px"}} color="primary" variant="bordered">Required Trophies :{" "}{data?.requiredTrophies}</Badge></Grid>
    <Grid><Badge  key="clan badge 1" css={{borderRadius:"8px"}} color="secondary" variant="bordered">Required Townhall :{" "}{data?.requiredTownhallLevel}</Badge></Grid>
    <Grid><Badge key="clan badge 2"  css={{borderRadius:"8px"}} color="warning" variant="bordered">Required builder trophies :{" "}{data?.requiredBuilderBaseTrophies}</Badge></Grid>
    <Grid><Badge key="clan badge 3"  css={{borderRadius:"8px"}} color="error" variant="bordered">Clan mode:{" "}{data?.type}</Badge></Grid>

    <Grid><Badge key="clan badge 4"  css={{borderRadius:"8px"}} color="secondary" variant="bordered">Clan trophies :{" "}{data?.clanPoints}</Badge></Grid>
    <Grid><Badge key="clan badge 5"  css={{borderRadius:"8px"}} color="success" variant="bordered">Clan builder trophies :{" "}{data?.clanVersusPoints}</Badge></Grid>
    <Grid><Badge key="clan badge 6"  css={{borderRadius:"8px"}} color="error" variant="bordered">Capital Trophies :{" "}{data?.clanCapitalPoints}</Badge></Grid>
    <Grid><Badge key="clan badge 7"  css={{borderRadius:"8px"}} color="warning" variant="bordered">War win streak :{" "}{data?.warWinStreak}</Badge></Grid>
    <Grid><Badge key="clan badge 8"  css={{borderRadius:"8px"}} color="success" variant="bordered">War wins :{" "}{data?.warWins}</Badge></Grid>
    <Grid><Badge key="clan badge 9"  css={{borderRadius:"8px"}} color="error" variant="bordered">Wars lost :{" "}{data?.warLosses}</Badge></Grid>

    </Grid.Container>
    </div>
    </section>
    <Spacer />
    <div className="gap-2 flex flex-col relative">
      <div className="flex flex-row gap-2">
      
        <Input id="searchInput" css={{width:"100%"}} clearable placeholder="Search players" value={input} size="sm" onChange={handleSearchChange}/>
          <Dropdown>
            <Dropdown.Button css={{backgroundColor:"#9750DD90 !important"}} flat color="secondary" size="sm"  className=" border-[.5px]">
                Options
              </Dropdown.Button>
              <Dropdown.Menu
              
              variant="flat"
              aria-label="Actions"
            >
              <Dropdown.Item key="role" color="secondary"><button onClick={handleSortRole}>Sort By Role Ascending</button></Dropdown.Item>
              <Dropdown.Item key="xp" color="success"><button onClick={handleExpSort}>Sort by XP</button></Dropdown.Item>
              <Dropdown.Item key="stars sort" color="warning"><button onClick={handleStarsSort}>Sort by Stars</button></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button onClick={()=> setCardState(!cardState)} className="p-1 px-2 rounded-md border-[.5px] border-gray-500/50">{cardState ? <RxDashboard /> : <BsViewList/>}</button>
      </div>
        {showsugg && <div className="transition flex flex-col ease-out duration-200 absolute w-full z-50 top-0 mt-10">
          <Card css={{borderRadius:"8px"}} className="border-gray-500/50 border-[.5px] p-2 scrollbar-sm flex flex-col max-h-72 overflow-y-scroll">
            {suggLoading ? <Loading type="points" color="secondary" /> : 
            <div ref={parent} className="gap-1 flex flex-col">
          {suggestions && suggestions.map((a,i) => <Suggestions clickHandle={(suggestion) => setInput(suggestion)} data={a} key={a?.name}/>)
          }</div>}</Card>
       </div>}
       <div className="z-0 justify-center flex w-full">
        <Button flat auto size="sm" color="warning" css={{backgroundColor:"#F5A52480 !important"}} onPress={handleCreateTeam}>Create Team <MdOutlineAddModerator className="ml-1" /></Button>
       </div>
    </div>
  <div className="flex w-full justify-end px-8"><Text>Players:{data?.members || "-"}/50</Text></div>
  <div ref={parent} id="membersScroll" className={`p-2 sm:p-4 grid items-center justify-center ${cardState ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} ${"mb-72"}`}>
    {members.map((a,i)=>
      <div key={a?.tag} className="w-full h-full border-[.5px] p-2 sm:p-4 border-gray-500/20">
      {cardState ? <ClanPlayerCard data={a} buttonState={createState}/> :
      <ClanList data={a} buttonState={createState}/> }
      </div>
    )}
    </div>


    {/* This is the Footer file */}


    {createState &&
    
    <section className="z-20 flex flex-col w-full h-1/3 fixed bottom-0 backdrop-blur-xl border-t-[.5px] border-gray-500/50 overflow-scroll">
      <div className="flex flex-row w-full justify-between p-2">
      <Button color="success" flat auto size="sm" css={{backgroundColor:"#17C96470 !important"}} onClick={handleClickScrollTeamCancel}><RxCross1 className="scale-125"/></Button>
      <div className="flex flex-row gap-4">
      <Input
        css={{margin:"0px",padding:"0px"}}
        clearable
        underlined
        size="sm"
        onChange={(e)=>setTeamName(e.target.value)}
        value={teamName}
        placeholder="Team Alpha"
        />
      <Button color="success" flat auto size="sm" onPress={handleSubmit} css={{backgroundColor:"#17C96470 !important"}}>Save</Button>
      </div>
      <div className="flex flex-row gap-2">
      <Button color="error" onPress={handleResetTeam} flat auto size="sm" css={{backgroundColor:"#F3126070 !important"}}><MdOutlineDeleteOutline /></Button>
      <Button color="error" flat auto size="sm" css={{backgroundColor:"#F3126070 !important"}} onPress={handleClose}><RxCross1 className="scale-125"/></Button>
      </div>
      </div>
      {createdTeam.length !== 0 ? <div className="grid grid-flow-row grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2 w-full ">{createdTeam?.map((a,i)=> <Suggestions className="pointer-events-none" key={a?.name} data={a} />)}</div>  :
      <div className="flex w-full h-full items-center justify-center">
        <Text css={{opacity:"0.5"}}>Add Players from above...</Text></div>}
    </section> 
    }
    <ToastContainer
      position="top-center"
      autoClose={2000}
      limit={2}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDark ? "dark" : "light"}
      />

    </main>
  </>
  );
}

export default ClanMainInfo;