import React, { useState, useEffect } from 'react';
//Icons
import {
  PaperAirplaneIcon
} from '@heroicons/react/solid';
import { theme } from '../../tailwind.config';

function TypingArea() {
  const [chatContent, chatInputProps] = useTextForm("");

  function useTextForm(name) {
    const [value, setState] = useState("");
  
    const handleChange = e => {
        setState(e.target.value);
    };
  
    const inputProps = {
        name,
        type: "text",
        onChange: handleChange
    };
  
    return [value, inputProps];
  }

  return (
    <div className='relative h-full w-full'>
      <div className='absolute h-full w-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
        <input type="text" class="bg-white border-[2px] focus:outline-steel_teal text-[10pt] font-poppins rounded-lg inline-block h-full w-full p-2.5" value={chatContent} {...chatInputProps}/>
      </div>

      <div className='absolute right-0 h-full w-[15%] flex items-center justify-center'>
        <div className='h-full aspect-square scale-75 rounded-full rotate-90 bg-steel_teal drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer'>
          <PaperAirplaneIcon className='scale-[45%]' style={{color: '#ffffff'}}>
          </PaperAirplaneIcon>
        </div>
      </div>
    </div>
  )
}

export default TypingArea