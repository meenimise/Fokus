import React from 'react';
import TypingArea from './TypingArea';
import Message from './Message';

function ChatArea() {
  return (
    <div className='absolute h-[90%] w-[93%]'>
      <div className='relative h-full w-full bg-green-300'>
        <Message isFirstMessage={true}></Message>
      </div>

      <TypingArea></TypingArea>
    </div>
  )
}

export default ChatArea