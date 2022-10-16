import React from 'react';
import FirstMessageHeader from './FirstMessageHeader';

function countWords(str) {
  if (str != null) {
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;
  }
}

function Message(props) {
  const isMyMessage = props.isMyMessage;
  const isFirstMessage = props.isFirstMessage;
  const messageContent = props.messageContent;
  const timestamp = props.timestamp;

  return (
    isMyMessage == false ?
    (
      isFirstMessage == true ?
      (
        <div className='flex flex-col w-full'>
          <FirstMessageHeader
            _isMyMessage={false}
            profileImgUrl={'someurl'}
            username={'somename'}
          >
          </FirstMessageHeader>
  
          <div className='flex flex-row w-full'>
          {
            countWords(messageContent) > 1 ?
            <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-b-[10px] rounded-tr-[10px] bg-grey_message'>
              {messageContent}
            </div>
            :
            <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-b-[10px] rounded-tr-[10px] bg-grey_message'>
              {messageContent}
            </div>
          }
          </div>
        </div>
      )
      :
      (
        <div className='flex flex-row w-full'>
          {
            countWords(messageContent) > 1 ?
            <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-b-[10px] rounded-[10px] bg-grey_message'>
              {messageContent}
            </div>
            :
            <div className='w-auto max-w-[80%] mt-[2%] p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-b-[10px] rounded-[10px] bg-grey_message'>
              {messageContent}
            </div>
          }
        </div>
      )
    )
    :
    (
      isFirstMessage == true ?
      (
        <div className='flex flex-row-reverse w-full'>
        {
          countWords(messageContent) > 1 ?
          <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-words ... rounded-b-[10px] rounded-tl-[10px] bg-steel_teal'>
            {messageContent}
          </div>
          :
          <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-all ... rounded-b-[10px] rounded-tl-[10px] bg-steel_teal'>
            {messageContent}
          </div>
        }
        </div>
      )
      :
      (
        <div className='flex flex-row-reverse w-full'>
        {
          countWords(messageContent) > 1 ?
          <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-words ... rounded-b-[10px] rounded-[10px] bg-steel_teal'>
            {messageContent}
          </div>
          :
          <div className='w-auto max-w-[80%] mt-[2%] h-auto p-[15px] inline-block align-top text-white font-poppins text-[10pt] break-all ... rounded-b-[10px] rounded-[10px] bg-steel_teal'>
            {messageContent}
          </div>
        }         
        </div>
      )      
    )
  )
}

export default Message