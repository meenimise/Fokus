import React, { useState } from 'react';
//Icons
import {
    XCircleIcon
} from '@heroicons/react/solid';
import { theme } from '../tailwind.config';

function NotiPopup(props) {
    const notiTitle = props.notiTitle;
    const hasButton = props.hasButton;
    const buttonTitle = props.buttonTitle;
    const notiInfo = props.notiInfo;
    const hasExitButton = props.hasExitButton;
    const extraFunction = props.extraFunction;
    const extraFunctionOnClosed = props.extraFunctionOnClosed;
    const [isExitButtonClicked, setExitButtonClicked] = useState(false);

    return (
        <>
        {
            isExitButtonClicked === false ?
            <div className='relative flex items-center justify-center h-full w-full'>
                <div className='absolute w-[60%] h-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
                    <div className='h-[15%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
                        {notiTitle}

                        {
                            hasExitButton === true ?
                            <div className='absolute right-[15px] h-[40px] w-[40px] hover:cursor-pointer' style={{color: theme.extend.colors.steel_teal}} onMouseOver={({target})=>target.style.color=theme.extend.colors.morning_blue} onMouseOut={({target})=>target.style.color=theme.extend.colors.steel_teal}
                                onClick={
                                    () => {
                                        setExitButtonClicked(true);
                                        extraFunctionOnClosed();
                                    }
                                }
                            >
                                <XCircleIcon></XCircleIcon>
                            </div>
                            :
                            null
                        }                                  
                    </div>
                    
                    {
                        hasButton == true ?
                        <>
                            <div className='relative h-[70%] w-[90%] mx-auto flex items-center justify-center'>
                                <div className='h-[70%] w-[90%]'>
                                    <div className='h-full w-full'>
                                        <div className='absolute w-[90%] h-full text-sm font-poppins font-medium select-none break-words ...'>
                                            {notiInfo}                                          
                                        </div>                                        
                                    </div>
                                </div>
                            </div>

                            <div className='relative h-[15%] w-[90%] mx-auto flex items-center justify-center'>
                            {
                                <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-steel_teal rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-morning_blue hover:cursor-pointer select-none"
                                onClick={() => {
                                        setExitButtonClicked(true);
                                        extraFunction(); 
                                    }
                                }>
                                    {buttonTitle}
                                </button>                                  
                            }
                            </div>                            
                        </>
                        :
                        <div className='relative h-[85%] w-[90%] mx-auto flex items-center justify-center'>
                            <div className='h-[70%] w-[90%]'>
                                <div className='h-full w-full'>
                                    <div className='absolute w-[90%] h-full text-sm font-poppins font-medium select-none break-words ...'>
                                        {notiInfo}                                          
                                    </div>                                        
                                </div>
                            </div>
                        </div>                        
                    } 
                </div>                 
            </div>
            : 
            null
        }         
        </>
    )
}

export default NotiPopup