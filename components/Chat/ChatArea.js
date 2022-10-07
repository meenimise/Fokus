import React from 'react';
import TypingArea from './TypingArea';
import Message from './Message';

function ChatArea() {
  return (
    <div className='relative h-[80%] w-[93%]'>
      <div className='h-full w-full'>
        <div className='relative h-[80%] w-full bg-green-300 overflow-y-auto'>
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

          <div className='h-[10%] w-full'></div>                   
        </div>
   
        <div className='relative h-[20%] w-full bg-orange-400'>

        </div>
      </div>
    </div>
  )
}

export default ChatArea