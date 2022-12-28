import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import TypingArea from './TypingArea';
import Message from './Comment';
import ScrollIntoView from 'react-scroll-into-view';
//Firestore
import { useFirestoreQuery } from '../../firestore/Query';
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function ChatArea(props) {
  const sessionId = props.sessionId;
  const { data: session } = useSession();
  const currentUserId = session?.user.id;

  //Connect to the messages collection of this session and query messages
  const thisSessionDocRef = fs.doc(db, "fkSessions", sessionId);
  const thisMessagesColRef = fs.collection(thisSessionDocRef, "messages");
  const messages = useFirestoreQuery(fs.query(thisMessagesColRef, fs.orderBy('timestamp'), fs.limitToLast(30)));

  return (
    <div className='relative h-[80%] w-[93%]'>
      <div className='h-full w-full'>
        <ScrollIntoView selector='#footer' className='relative h-[83%] w-full overflow-y-auto rounded-[15px] scroll-smooth'>
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
          <div id='#footer' className='h-[15%] w-full'></div>                   
        </ScrollIntoView>
   
        <div className='relative h-[17%] w-full rounded-[15px]'>
          <TypingArea></TypingArea>
        </div>
      </div>
    </div>
  )
}

export default ChatArea