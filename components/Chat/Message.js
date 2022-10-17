import React from 'react';
import { useSession } from 'next-auth/react';
import MessageHeader from './MessageHeader';

function countWords(str) {
  if (str != null) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
  }
}

function Message(props) {
  const userId = props.userId;
  const messageContent = props.messageContent;
  const timestamp = props.timestamp;

  const { data: session } = useSession();
  const currentUserId = session?.user.id;

  return (
    userId != currentUserId ?
    (
      <div className='flex flex-col w-full'>
        <MessageHeader
          _userId={userId}
        >
        </MessageHeader>

        <div className='flex flex-row w-full'>
        {
          countWords(messageContent) > 1 ?
          <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-[10px] bg-grey_message'>
            {messageContent}
          </div>
          :
          <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-[10px] bg-grey_message'>
            {messageContent}
          </div>
        }
        </div>
      </div>
    )
    :
    (
      <div className='flex flex-row-reverse w-full'>
      {
        countWords(messageContent) > 1 ?
        <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-words ... rounded-[10px] bg-steel_teal'>
          {messageContent}
        </div>
        :
        <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-all ... rounded-[10px] bg-steel_teal'>
          {messageContent}
        </div>
      }
      </div>
    )
  )
}

export default Message