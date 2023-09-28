import { Text, Link, Image, Dropdown, Spacer, Badge, Grid, Container, Input, Switch, Card, Loading, Button, Collapse } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, doc, deleteDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase"
import NavbarMain from "@/components/NavbarMain";
import { useRouter } from "next/router";
import { MdDeleteOutline, MdOutlineModeEditOutline, MdOutlineDone } from "react-icons/md";


const teams = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const sessionEmail = session?.user.email;
  const collectionRef = collection(db, 'users');
  const [firebaseUser, setFirebaseUser] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [docRef, setDocRef] = useState("");
  const [editable, setEditable] = useState(false);
  const [teamName, setTeamName] = useState("")


  const getTeams = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      const userDoc = querySnapshot.docs.find((doc) => {
        return doc.data().userEmail === sessionEmail;
      });
      if (userDoc) {
        const userId = userDoc.id
        const user = userDoc.data()
        const teamsData = [...user?.teams]
        setDocRef(userId);
        setFirebaseUser(user.userEmail);
        setTeamList(teamsData);
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getTeams()

  }, [sessionEmail])

  const handleDelete = async () => {
    {
      session?.user.email === data.authorEmail &&
      await deleteDoc(commentRef);
      onChange()
    }
  }

  const handleEdit = () => {
    setEditable(true);
  }

  const handleDone = async () => {
    await updateDoc(commentRef, {
      text: commentText
    });
    setEditable(false)
    getTeams();
  }
  if(!session){
    return (
      <>
      <NavbarMain />
      <div className="flex min-h-screen min-w-screen items-center justify-center"><Text size={20}>Please <Link href="/auth/login" underline color="secondary">
            Sign In
          </Link> to Continue</Text>
      </div>
      </>
    )
  }

  return (
    <>
      <main className="flex flex-col min-w-screen items-center">
        <NavbarMain />
        {(teamList?.length === 0) ? 
      (
      <div className="flex min-h-screen min-w-screen items-center"><Text size={20}>Visit your <Link underline href="/player" color="secondary">
          Clan Page
        </Link> to create a new team</Text></div>
      ) : (

            <div className="flex flex-col items-center max-w-screen-md h-96 m-4 p-2">
              <Text weight="extrabold" size={50} className="bg-gradient-radial from-slate-200 via-slate-600 to-slate-800 bg-clip-text text-transparent drop-shadow-lg antialiased animate-text transition-all ease-linear px-2">My Teams</Text>
              <Spacer />
              <container className="flex flex-col w-full gap-4 ">
                {teamList && teamList.map((a, i) => {
                  return (<div key={a.teamName} className="grid grid-cols-6 gap-10 border-b-[.5px] border-gray-500/50 p-2">
                    <div className={`col-span-2 ${!editable && 'transparentBg'}`}>
                      <Input fullWidth readOnly={!editable} css={{ backgroundColor: "none", fontWeight: "$bold" }} initialValue={a.teamName} onChange={(e) => setTeamName(e.target.value)} />
                    </div>
                    <div className="col-span-3 px-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {a.players?.map((players, index) => {
                          return (
                            <Badge key={players} variant="flat">{players}</Badge>
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-span-1 justify-end">
                      <span className="flex flex-col gap-2">
                        {!editable ? <Button auto size="xs" flat onPress={handleEdit} css={{ backgroundColor: "#006FEE80 !important", maxidth: "fit-content(20em) !important" }}><MdOutlineModeEditOutline className="scale-125" /></Button> :
                          <>
                            <Button auto color="success" size="xs" onPress={handleDone} flat css={{ backgroundColor: "#17C96480 !important", maxidth: "fit-content(20em) !important" }}>Submit</Button>
                            <Button auto color="error" size="xs" onPress={() => setEditable(false)} flat css={{ backgroundColor: "#F3126080 !important", maxidth: "fit-content(20em) !important" }}>Cancel</Button>
                          </>}
                        <Button color="error" auto size="xs" flat css={{ background: "#F3126080 !important" }}><MdDeleteOutline className="scale-125" /></Button>
                      </span>
                    </div>
                  </div>)
                }
                )}
              </container>
            </div> )}
      </main>
    </>
  );
}

export default teams;