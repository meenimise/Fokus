import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TypingArea from './TypingArea';
import Message from './Message';
//Firestore
import { useFirestoreQuery } from '../../firestore/Query';
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function ChatArea(props) {
  const sessionId = props.sessionId;
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const [messagesList, setMessagesList] = useState([]);

  // //useEffect
  // useEffect(() => {
  // }, []);

  //Connect to message collection of this session
  const thisSessionRef = fs.doc(db, "fkSessions", sessionId);
  const thisMessagesColRef = fs.collection(thisSessionRef, "messages");
  const q_messages = fs.query(thisMessagesColRef, fs.orderBy('timestamp'));
  const messages = useFirestoreQuery(q_messages);

  // formatMessages();
  console.log(messages);

  // //Formatting messages to current user's view
  // function formatMessages() {
  //   if (messages.length != 0) {
  //     for (var i = 0; i < messages.length; i++) {
  //       //Handle displaying messages according to current user's view
  //       var _isMyMessage;
  //       var _isFirstMessage;
  //       if (messages[i].userId == currentUserId) {
  //         _isMyMessage = true;
  //       }
  //       else {
  //         _isMyMessage = false;
  //       }
  //       if (messages[i].userId != messages[i - 1]?.userId) {
  //         _isFirstMessage = true;
  //       }
  //       else {
  //         _isFirstMessage = false;
  //       }
  
  //       //Save to messages list
  //       setMessagesList(messagesList => [...messagesList, {
  //         userId: messages[i].userId,
  //         messageContent: messages[i].messageContent,
  //         timestamp: messages[i].timestamp,
  //         isMyMessage: _isMyMessage,
  //         isFirstMessage: _isFirstMessage            
  //       }]);
  //     }
  //   }
  // }

  return (
    <div className='relative h-[80%] w-[93%]'>
      <div className='h-full w-full'>
        <div className='relative h-[83%] w-full overflow-y-auto rounded-[15px]'>
          {
            messagesList?.map(item => {
              return (
                <Message
                isMyMessage={item?.isMyMessage} 
                isFirstMessage={item?.isFirstMessage}
                messageContent={item?.messageContent}
                timestamp={item?.timestamp}
                >
                </Message>
              )
            })
          }
          <div className='h-[15%] w-full'></div>                   
        </div>
   
        <div className='relative h-[17%] w-full rounded-[15px]'>
          <TypingArea></TypingArea>
        </div>
      </div>
    </div>
  )
}

export default ChatArea