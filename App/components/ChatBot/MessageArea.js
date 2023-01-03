import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
// import ScrollIntoView from 'react-scroll-into-view';
//Icons
import {
  PaperAirplaneIcon
} from '@heroicons/react/solid';
import { theme } from '../../tailwind.config';
// Chatbot helper functions
import {tranformInterchanges, showBotTyping, getBotAnswer, fetchQuery } from '../../utils/helper';

function MessageArea() {
  const [interchanges, setInterchanges] = useState();
  const [userQuestion, setUserQuestion] = useState("");
  const [allow, setAllow] = useState(false);
  const [interchange, setInterchange] = useState([]);

  useEffect(() => {
    (async() => {
      const data = await fetchQuery('interchanges');
      setInterchanges(data);
    })();
  }, []);

  const botIsTyping = async () => {
    await showBotTyping(setInterchange, [], setAllow);
  }

  useEffect(() => {
      botIsTyping().then(() => {
        setInterchange([{
          owner: false,
          text: tranformInterchanges(interchanges, true)
         }]);
      }
      );
   }, [interchanges])

  // Handle submit question
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!userQuestion || userQuestion == "" || !allow) return;
    const uQ = userQuestion;
    const newInterchange = [...interchange, {
      owner: true,
      text: userQuestion
    }]
  
    setInterchange(newInterchange);
    setUserQuestion('');
    setAllow(false);
    getBotAnswer(interchanges, setInterchange,  uQ, newInterchange, setAllow);
  }

  return (
    <div className='relative h-[95%] w-[93%]'>
      <div className='h-full w-full'>
        <div className='relative h-[80%] w-full overflow-y-auto rounded-[15px] scroll-smooth scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey_message scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          {
            interchange?.map(item => {
              return (
                <Message
                  messageOwner={item.owner}
                  messageContent={item.text}
                >
                </Message>
              )
            })
          }
          <div className='relative h-[20%]' id="scrollTo"></div>                       
        </div>

        <div className='relative h-[10%] w-full'>
        </div>
   
        <div className='relative h-[15%] w-full rounded-[15px]'>
          {/* Typing area */}
          <form onSubmit={handleSubmit} className='relative h-[70%] w-full'>
            <div className='absolute h-full w-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
              <input value={userQuestion} onChange={ (e) => { setUserQuestion(e.target.value)}} type="text" class="bg-white border-[2px] focus:outline-steel_teal text-[10pt] font-poppins rounded-lg inline-block h-full w-full p-2.5"/>
            </div>

            <div className='absolute right-0 h-full w-[15%] flex items-center justify-center'>
              <button type='submit' className='h-full aspect-square scale-[85%] rounded-full rotate-90 bg-steel_teal drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer'>
                <PaperAirplaneIcon className='scale-[45%]' style={{color: '#ffffff'}}>
                </PaperAirplaneIcon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MessageArea