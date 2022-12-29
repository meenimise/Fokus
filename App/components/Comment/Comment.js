import React from 'react';
import { useSession } from 'next-auth/react';
import CommentHeader from './CommentHeader';

function countWords(str) {
  if (str != null) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
  }
}

function Comment(props) {
  const userId = props.userId;
  const commentContent = props.commentContent;
  const timestamp = props.timestamp;

  const { data: session } = useSession();
  const currentUserId = session?.user.id;

  return (
    <div className='flex flex-col w-full'>
      <CommentHeader
        _userId={userId}
      >
      </CommentHeader>

      <div className='flex flex-row w-full'>
      {
        countWords(commentContent) > 1 ?
        <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-[10px] bg-grey_message'>
          {commentContent}
        </div>
        :
        <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-[10px] bg-grey_message'>
          {commentContent}
        </div>
      }
      </div>
    </div>
  )
}

export default Comment