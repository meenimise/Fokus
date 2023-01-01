import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
//Icons
import {
  PaperAirplaneIcon
} from '@heroicons/react/solid';
import { theme } from '../../tailwind.config';
//Firestore
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function TypingArea(props) {
  const postId = props.postId;

  const ref = useRef(null);

  const [commentContent, commentInputProps] = useTextForm("");

  const { data: session, status } = useSession();

  // Handle post comment
  const postComment = async () => {
    await fs.addDoc(fs.collection(db, "posts", postId, "comments"), {
      userId: session?.user?.id,
      commentContent: commentContent,
      timestamp: fs.serverTimestamp(),      
    });    
  }

  function useTextForm(name) {
    const [value, setState] = useState("");
  
    const handleChange = e => {
        setState(e.target.value);
    };
  
    const inputProps = {
        name,
        type: "text",
        onChange: handleChange
    };
  
    return [value, inputProps];
  }

  return (
    <div className='relative h-[70%] w-full'>
      <div className='absolute h-full w-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
        <input ref={ref} type="text" class="bg-white border-[2px] focus:outline-steel_teal text-[10pt] font-poppins rounded-lg inline-block h-full w-full p-2.5" {...commentInputProps}/>
      </div>

      <div className='absolute right-0 h-full w-[15%] flex items-center justify-center'>
        <div className='h-full aspect-square scale-80 rounded-full rotate-90 bg-steel_teal drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer'
          onClick={
            () => {
              postComment();
              ref.current.value = '';
          }
        }
        >
          <PaperAirplaneIcon className='scale-[45%]' style={{color: '#ffffff'}}>
          </PaperAirplaneIcon>
        </div>
      </div>
    </div>
  )
}

export default TypingArea