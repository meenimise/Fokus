import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import TypingArea from './TypingArea';
import Message from './Message';
//Firestore
import { useFirestoreQuery } from '../../firestore/Query';
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';
import { scrollDown } from '../../utils/helper';

function ChatArea(props) {
  const sessionId = props.sessionId;
  const { data: session } = useSession();
  const currentUserId = session?.user.id;

  //Connect to the messages collection of this session and query messages
  const thisSessionDocRef = fs.doc(db, "fkSessions", sessionId);
  const thisMessagesColRef = fs.collection(thisSessionDocRef, "messages");
  const messages = useFirestoreQuery(fs.query(thisMessagesColRef, fs.orderBy('timestamp'), fs.limitToLast(30)));

  useEffect(() => {
    scrollDown();
 }, [messages]);

  return (
    <div className='relative h-[80%] w-[93%]'>
      <div className='h-full w-full'>
        <div key={""} className='relative h-[83%] w-full overflow-y-auto rounded-[15px] scroll-smooth scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey_message scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {
            messages?.map(item => {
              return (
                <Message
                userId={item?.userId} 
                messageContent={item?.messageContent}
                timestamp={item?.timestamp}
                >
                </Message>
              )
            })
          }
          <div className='relative h-[50%]' id="scrollTo"></div>                         
        </div>

        <div className='relative h-[5%] w-full'>
        </div>
   
        <div className='relative h-[17%] w-full rounded-[15px]'>
          <TypingArea sessionId={sessionId}></TypingArea>
        </div>
      </div>
    </div>
  )
}

export default ChatArea