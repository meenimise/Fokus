import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '..';
import { theme } from '../../tailwind.config';
import { removeVI, DefaultOption } from 'jsrmvi';
//Icons
import {
  PhotographIcon,
} from '@heroicons/react/solid';

function Feed() {
  const { data: session, status } = useSession();

  function useRadioButtons(name) {
    const [value, setState] = useState(0);
  
    const handleChange = e => {
      setState(e.target.value);
    };
  
    const inputProps = {
      name,
      type: "radio",
      onChange: handleChange
    };
  
    return [value, inputProps];
  }

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

  const [showCircularButtonSession, setShowCircularButtonSession] = useState(false);
  const [privacyValue, privacyInputProps] = useRadioButtons("");
  const [sessionNameValue, sessionInputProps] = useTextForm("");
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        <div className="flex h-full w-full">
          <div className='flex justify-center items-center h-[50%] w-full'>
              <div className='w-[90%] h-[80%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
                  <div className='h-[20%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
                    {"Create Post"}                                
                  </div>

                  <div className='relative h-[50%] w-full flex items-center justify-center'>
                      <div className='h-[50%] w-[90%]'>
                          <div className='h-[40px] w-full flex items-center justify-center'>
                                { 
                                    isBeingProcessed == false ?
                                    <div className='relative flex w-full h-full'>
                                      <input placeholder={"What's on your mind " + removeVI(session?.user.name, { ignoreCase: false, replaceSpecialCharacters: false }) + "?"} type="text" name="session" id="session_name" class="inline-block bg-white border-[2px] focus:outline-steel_teal text-sm font-poppins rounded-lg h-full w-[94%] p-2.5 break-words" value={sessionNameValue} {...sessionInputProps}/>

                                      <div className='absolute h-full w-[40px] right-0 rounded-[8px] hover:cursor-pointer hover:bg-morning_blue bg-[#6A8D92]' style={{color: "#ffffff"}}>
                                        <PhotographIcon className="scale-75">
                                        </PhotographIcon>
                                      </div>
                                    </div>
                                    :
                                    <input type="text" name="session" id="session_name" class="inline-block bg-slate-100 border-[2px] text-sm text-grey font-poppins rounded-lg h-full w-full p-2.5" value={sessionNameValue} disabled/>
                                }                                
                          </div>
                      </div>
                  </div>

                  <div className='relative h-[30%] w-[90%] mx-auto flex items-center justify-center'>
                    {
                      (sessionNameValue === "") ?
                      <button type="button" class="absolute flex items-center justify-center right-0 w-[10%] h-[60%] bg-grey opacity-30 rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                        {"Post"}
                      </button>
                      :
                      (
                        showCircularButtonSession == false ?
                        <button type="button" class="absolute flex items-center justify-center right-0 w-[10%] h-[60%] bg-steel_teal rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-morning_blue hover:cursor-pointer select-none"
                        onClick={() => {
                            setShowCircularButtonSession(true); 
                            setIsBeingProcessed(true); 
                          }
                        }>
                          {"Post"}
                        </button>
                        :
                        <button type="button" class="absolute flex items-center justify-center right-0 w-[16%] h-[60%] bg-grey rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>

                            {"Posting..."}
                        </button>                                    
                      )
                    }
                  </div>                            
              </div>
          </div>
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Feed