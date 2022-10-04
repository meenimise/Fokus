import React from 'react';
import FirstMessageHeader from './FirstMessageHeader';

function countWords(str) {
  const arr = str.split(' ');
  return arr.filter(word => word !== '').length;
}

function Message(props) {
  const isFirstMessage = props.isFirstMessage;
  const message = 'This is a very long message so that I can check if it is responsive or not.'

  return(
    isFirstMessage == true ?
    <div className='absolute w-[47.5%]'>
      <FirstMessageHeader
        profileImgUrl={'someurl'}
        username={'somename'}
      >
      </FirstMessageHeader>

      {
        countWords(message) > 1 ?
        <div className='relative top-[10px] w-auto h-auto p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-words ... rounded-[10px] bg-grey_message'>
          {message}
        </div>
        :
        <div className='relative top-[10px] w-auto h-auto p-[15px] inline-block align-top text-black font-poppins text-[10pt] break-all ... rounded-[10px] bg-grey_message'>
          {message}
        </div>
      }
    </div>
    :
    <div>
      Not first message
    </div>
  )
}

export default Message