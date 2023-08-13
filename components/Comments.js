import { Text, Image,Textarea,Dropdown,Spacer,Badge,Grid,Container,Input,Card,Button,Row,Col,Link } from "@nextui-org/react";
import CommentsCard from "@/utils/CommentsCard";
import { useState,useEffect } from 'react';
import { useTheme } from '@nextui-org/react'
import { collection, addDoc,getDocs ,serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase"
import {useSession} from "next-auth/react"
import { useRouter } from "next/router";

const Comments = ({playerTag}) => {
  const {data:session} = useSession();
  const [commentText , setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const {isDark} = useTheme();
  const footerBg = isDark ? "bg-black/30" : "bg-black/10";
  const collectionRef = collection(db, 'comments');
  const getComments = async ()=>{
    try {
  const querySnapshot = await getDocs(collectionRef);
  const dataArray = []; 
  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    if (userData.playerTag === playerTag) {
      dataArray.push({id:doc.id , ...userData });
    }
    
  });
  setCommentsData(dataArray)} catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
      getComments();
    },[])
  const handleSubmit = async () => {
    if (!session) {
      return;
    }

    try {
      const newComment = {
        playerTag,
        text: commentText,
        authorEmail: session?.user.email,
        authorName: session?.user.name,
        timestamp: serverTimestamp()

      };

      // Save the new comment to Firestore
      await addDoc(collection(db, 'comments'),newComment)
      // Reset the comment form
      setCommentText('');
      getComments()
    } catch (error) {
      // Handle error
      console.error('Error adding comment:', error);
    }
  };
  const handleChangeComment = () => {
    getComments();
  };

  return (
    <Card css={{borderRadius:"8px",border:"none"}}>
      <Card.Header css={{padding:"14px 20px"}}>
        <Text>Comments</Text>
      </Card.Header>
      <Card.Body css={{padding:"0px 12px 12px 12px"}}>
        <div className="flex flex-col gap-3">
      {commentsData.length !== 0 ? 
      commentsData?.map((a,i)=>(
        <CommentsCard data={a} key={a.id} onChange={handleChangeComment}/>
      ))
    
    : <div className="m-4 flex justify-center opacity-50"><Text size={14} weight="extrabold">No comments yet....</Text></div>
    }

        </div>
      </Card.Body>
      {!session &&
      <div className="w-full flex justify-center bg-blue-400/40"><Link href="/auth/login" color="primary" underline className="uppercase text-xs p-1">
          Please SignIn to post comment
        </Link></div> }
      <Card.Footer css={{padding:"0px 0px",margin:"0px 0px",borderTopWidth:"1px",borderColor:"rgb(107 114 128/0.2)",borderRadius:"0px"}}>
        <div className={`flex flex-col w-full h-full md:flex-row ${footerBg}`}>
          <div className="flex w-full px-3 pt-3 md:pb-3 md:pr-0">
          <Textarea
          css={{width:"100%",height:"100%"}}
          className="border-[.5px] border-gray-500/20"
          animated
          value={commentText}
          onChange={(e)=> setCommentText(e.target.value)}
          placeholder="Write down your comments here...."
          minRows={2}
          maxRows={6}
          size="md"
        />
          </div>
          <div className="flex flex-row w-full md:max-w-fit justify-around p-3 gap-2 md:flex-col">
          <Button auto css={{borderRadius:"8px",backgroundColor:"#9750DD"}} onPress={handleSubmit}  className="bg-violet-600/40" color="secondary" size="xs" flat >Submit
          </Button>
          <Button auto onPress={()=>setCommentText("")} css={{borderRadius:"8px",backgroundColor:"#F31260"}} className="bg-rose-500/30" color="error" size="xs" flat>Clear
          </Button>
          </div>
        </div>
      </Card.Footer>
      
    </Card>
  );
}

export default Comments;