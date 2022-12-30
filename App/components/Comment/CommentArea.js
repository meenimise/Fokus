import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import TypingArea from './TypingArea';
import Comment from './Comment';
// import ScrollIntoView from 'react-scroll-into-view';
//Firestore
import { useFirestoreQuery } from '../../firestore/Query';
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function CommentArea(props) {
  const postId = props.postId;
  const { data: session } = useSession();
  const currentUserId = session?.user.id;

  // Connect to the comments collection of this post and query comments
  const thisPostDocRef = fs.doc(db, "posts", postId);
  const thisCommentsColRef = fs.collection(thisPostDocRef, "comments");
  const comments = useFirestoreQuery(fs.query(thisCommentsColRef, fs.orderBy('timestamp'), fs.limitToLast(50)));

  return (
    <div className='relative h-[95%] w-[93%]'>
      <div className='h-full w-full'>
        <div className='relative h-[83%] w-full overflow-y-auto rounded-[15px] scroll-smooth'>
          {
            comments?.map(item => {
              return (
                <Comment
                userId={item?.userId} 
                commentContent={item?.commentContent}
                timestamp={item?.timestamp}
                >
                </Comment>
              )
            })
          }                
        </div>
   
        <div className='relative h-[17%] w-full rounded-[15px]'>
          <TypingArea></TypingArea>
        </div>
      </div>
    </div>
  )
}

export default CommentArea