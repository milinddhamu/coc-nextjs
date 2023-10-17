import { Card, Col, Text, Spacer,Link,Divider,Loading, Grid,Container,Badge,Input,Button } from "@nextui-org/react";
import { useState , useEffect } from "react";
import Image from "next/image";
import NavbarMain from "@/components/NavbarMain";
import { useSession,signIn,getSession,getProviders,getServerSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { AiOutlineGoogle } from "react-icons/ai";

const login = ({providers}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [email , setEmail ] = useState("");
  const [password , setPassword ] = useState("");
  const [loading , setLoading ] = useState(true);
  const [googleButton , setGoogleButton] = useState(false)
  useEffect(() => {
    if (session?.user.name) {
      router.push("/");
    }
  }, [session,router]);
  const handleGoogleSignIn = () => {
    setGoogleButton(true);
    signIn("google");
  }
  return (
    <>
      <section className="flex flex-col md:flex-row min-h-screen min-w-screen">
        <div className="flex items-center justify-center md:min-h-screen w-full relative overflow-hidden">
        <div className='absolute flex h-full w-full'>
        <Image
              onLoadingComplete={() => setLoading(false)}
              src="/assets/others/coc_background_goblin.png"
              alt="background signin"
              fill
              style={{objectFit: "cover"}}
              className={`
              duration-700 ease-in-out brightness-50
               ${loading
                  ? "scale-125 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0 "
                })`}
            />
        </div>
        <Text weight="extrabold" size={72} color="white" className="z-10 m-4 text-center">Log In</Text>
        </div>
        <div className="flex flex-col items-center justify-center gap-9 bg-gradient-to-b from-purple-700  to-black min-h-screen w-full">
        <Input labelPlaceholder="Email" onChange={(e)=> setEmail(e.target.value)} css={{minWidth:"260px"}}/>
        <Input.Password labelPlaceholder="Password" onChange={(e)=> setPassword(e.target.value)} css={{minWidth:"260px"}}/>
        <Button color="secondary" flat className="bg-violet-600/60 hover:bg-violet-800/70">Log in</Button>
        <Divider className="max-w-sm"/>
        <div key={"google"}>
          {(!googleButton) ? <Button color="secondary" flat className="bg-violet-600/60 hover:bg-violet-800/70" onClick={() => signIn("google" , { callbackUrl: '/' }) && setGoogleButton(true)}>
            Sign in with Google <AiOutlineGoogle className="scale-125 text-center mx-2 mt-[.5]" />
          </Button> : <Button disabled color="secondary" bordered >
          <Loading type="spinner" color="currentColor" size="sm" />
          </Button> }
        </div>
        </div>
      </section>
      </>
  );
}

export default login;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  }
}