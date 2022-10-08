import React from 'react';
import TypingArea from './TypingArea';
import Message from './Message';

function ChatArea() {
  return (
    <div className='relative h-[80%] w-[93%]'>
      <div className='h-full w-full'>
        <div className='relative h-[83%] w-full overflow-y-auto rounded-[15px]'>
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