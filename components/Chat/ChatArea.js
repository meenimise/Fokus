import React from 'react';
import TypingArea from './TypingArea';

function ChatArea() {
  return (
    <div className='absolute h-[90%] w-[93%]'>
      <div className='relative h-[80%] w-full bg-green-300'>
        Chat area here
      </div>

      <TypingArea></TypingArea>
    </div>
  )
}

export default ChatArea