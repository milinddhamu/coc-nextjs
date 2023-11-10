import { Text, Image, Textarea, Dropdown, Spacer, Badge, Grid, Container, Input, Card, Button, Row, Col } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { db } from "../firebase"
import { doc, deleteDoc,updateDoc  } from "firebase/firestore";
import { MdDeleteOutline, MdOutlineModeEditOutline,MdOutlineDone } from "react-icons/md";
import { useRouter } from "next/router";
import {useState} from 'react';
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

  //firebase
  const handleDelete = async () => {
    {session?.user.email === data.authorEmail &&
    await deleteDoc(commentRef);
    onChange()}
  }

  const handleEdit = () => {
    setEditable(true);
  }

  const handleDone = async () => {
    await updateDoc(commentRef,{
      text:commentText
    });
    setEditable(false)
    onChange();
  }

  return (
    <Card css={{ borderRadius: "12px" }} className="border-[.5px] border-gray-500/20">
      <div className="flex flex-col px-4 pb-3 pt-2 w-full">
        <div className="w-full flex flex-row justify-between opacity-80">
          <Text size={12}>{data.authorName}</Text>
          <Text size={12}>{formattedDate}</Text>
        </div>
        <div className={`text-justify flex flex-row w-full items-baseline ${!editable && 'transparentBg'}`}>
          <Input fullWidth id="comment" readOnly={!editable}
          shadow={false}
           
          style={{color:"none"}}
          initialValue={commentText} onChange={(e)=>setCommentText(e.target.value)} />
          {session?.user.email === data.authorEmail &&
            <div className="flex gap-1">
              {!editable ?
              <>
              <Button color="primary" flat auto onPress={handleEdit} size="sm"><MdOutlineModeEditOutline className="scale-125"/></Button>
              <Button color="error" flat auto onPress={handleDelete} size="sm"><MdDeleteOutline className="scale-125" /></Button>
              </>
                :
              <>
              <Button color="primary" flat auto size="sm" onPress={handleDone}><MdOutlineDone className="scale-125" /></Button>
              <Button color="error" flat auto onPress={()=> setEditable(false)} size="sm"><RxCross1 className="scale-125" /></Button> 
              </>
              }
            </div>
          }
        </div>

      </div>
    </Card>
  );
}

export default CommentsCard;