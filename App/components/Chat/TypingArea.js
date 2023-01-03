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
import { scrollDown } from '../../utils/helper';

function TypingArea(props) {
  const sessionId = props.sessionId;
  const [chatContent, chatInputProps] = useTextForm("");

  const ref = useRef(null);

  const { data: session, status } = useSession();

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

  // Handle send message
  const sendMessage = async (event) => {
    event.preventDefault();
    await fs.addDoc(fs.collection(db, "fkSessions", sessionId, "messages"), {
      userId: session?.user?.id,
      messageContent: chatContent,
      timestamp: fs.serverTimestamp(),      
    });
  }  

  return (
    <form onSubmit={sendMessage} className='relative h-full w-full'>
      <div className='absolute h-full w-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
        <input ref={ref} type="text" class="bg-white border-[2px] focus:outline-steel_teal text-[10pt] font-poppins rounded-lg inline-block h-full w-full p-2.5" {...chatInputProps}/>
      </div>

      <div className='absolute right-0 h-full w-[15%] flex items-center justify-center'>
        <button type='submit' className='h-full aspect-square scale-75 rounded-full rotate-90 bg-steel_teal drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer'
          onClick={() => {
            ref.current.value = '';
          }}
        >
          <PaperAirplaneIcon className='scale-[45%]' style={{color: '#ffffff'}}>
          </PaperAirplaneIcon>
        </button>
      </div>
    </form>
  )
}

export default TypingArea