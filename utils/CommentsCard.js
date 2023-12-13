import { Text, Image, Textarea, Dropdown, Spacer, Badge, Grid, Container, Input, Card, Button, Row, Col } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { db } from "../firebase"
import { doc, deleteDoc,updateDoc  } from "firebase/firestore";
import { MdDeleteOutline, MdOutlineModeEditOutline,MdOutlineDone } from "react-icons/md";
import { useRouter } from "next/router";
import {useState,useRef} from 'react';
import { RxCross1 } from "react-icons/rx";


const CommentsCard = ({ data ,onChange}) => {
  const commentRef = doc(db, "comments" , data.id)
  const [editable , setEditable ] = useState(false);
  const [commentText , setCommentText] = useState(data?.text)
  const { data: session } = useSession();
  const router = useRouter()
  const timestamp = data.timestamp
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const formattedDate = `${day} ${month} ${year}`;
  const commentInputRef = useRef(null);

  //firebase
  const handleDelete = async () => {
    {session?.user.email === data.authorEmail &&
    await deleteDoc(commentRef);
    onChange()}
  }

  const handleEdit = () => {
    setEditable(true);
    (commentInputRef.current) && commentInputRef.current.focus();
    
  }

  const handleDone = async () => {
    await updateDoc(commentRef,{
      text:commentText
    });
    setEditable(false)
    onChange();
  }

  return (
    <div>
      <div className="flex flex-col px-2 w-full">
        <div className={`w-full flex flex-row justify-between opacity-80 `}>
          <Text color={`${session?.user.email === data.authorEmail ? "primary" : "warning"}`} style={{whiteSpace: 'nowrap'}} weight="semibold" size={14}>{data.authorName}</Text>
          <Text size={12} style={{whiteSpace: 'nowrap',opacity:"0.7"}}>{formattedDate}</Text>
        </div>
        <div className={`flex flex-row w-full items-baseline ${!editable && 'transparentBg'} px-1`}>
          <Input fullWidth id="comment" ref={commentInputRef} readOnly={!editable}
          shadow={false}
          style={{color:"none !important",margin:"0",paddingLeft:"0.75rem",borderLeft: session?.user.email === data.authorEmail
          ? "3px solid rgba(44, 130, 201, 0.5)"
          : "1px solid rgba(245, 165, 36, 0.5)",borderTop:"none",borderRight:"none",borderBottom:"none" }}

          initialValue={commentText} onChange={(e)=>setCommentText(e.target.value)} />
          {session?.user.email === data.authorEmail &&
            <div className="flex">
              {!editable ?
              <>
              <Button color="primary" flat auto onPress={handleEdit} size="xs"><MdOutlineModeEditOutline className="scale-125"/></Button>
              <Button color="error" flat auto onPress={handleDelete} size="xs"><MdDeleteOutline className="scale-125" /></Button>
              </>
                :
              <>
              <Button color="primary" flat auto size="xs" onPress={handleDone}><MdOutlineDone className="scale-125" /></Button>
              <Button color="error" flat auto onPress={()=> setEditable(false)} size="xs"><RxCross1 className="scale-125" /></Button> 
              </>
              }
            </div>
          }
        </div>

      </div>
    </div>
  );
}

export default CommentsCard;