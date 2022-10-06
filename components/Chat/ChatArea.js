import React from 'react';
import TypingArea from './TypingArea';
import Message from './Message';

function ChatArea() {
  return (
    <div className='absolute h-[90%] w-[93%]'>
      <div className='h-full w-full bg-green-300 overflow-y-auto'>
        <Message
          isMyMessage={false} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={false} 
          isFirstMessage={false}
        >
        </Message>        

        <Message
          isMyMessage={true} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={false} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={true} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={false} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={true} 
          isFirstMessage={true}
        >
        </Message>

        <Message
          isMyMessage={false} 
          isFirstMessage={true}
        >
        </Message>                      

      </div>

      <TypingArea></TypingArea>
    </div>
  )
}

export default ChatArea