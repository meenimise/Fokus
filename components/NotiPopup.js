import React, { useState } from 'react';
//Icons
import {
    XCircleIcon
} from '@heroicons/react/solid';
import { theme } from '../tailwind.config';

function NotiPopup(props) {
    const notiTitle = props.notiTitle;
    const buttonTitle = props.buttonTitle;
    const notiInfo = props.notiInfo;
    const haveExitButton = props.haveExitButton;
    const extraFunction = props.extraFunction;
    const [isExitButtonClicked, setExitButtonClicked] = useState(false);

    return (
        <>
        {
            isExitButtonClicked === false ?
            <div className='relative flex items-center justify-center h-full w-full'>
                <div className='absolute w-[60%] h-[85%] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                    <div className='h-[15%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
                        {notiTitle}

                        {
                            haveExitButton === true ?
                            <div className='absolute right-[15px] h-[40px] w-[40px] hover:cursor-pointer' style={{color: theme.extend.colors.purple}} onMouseOver={({target})=>target.style.color=theme.extend.colors.purple_2} onMouseOut={({target})=>target.style.color=theme.extend.colors.purple}
                            onClick={() => setExitButtonClicked(true)}
                            >
                                <XCircleIcon></XCircleIcon>
                            </div>
                            :
                            null
                        }                                  
                    </div>

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
                        <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-purple rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-purple_2 hover:cursor-pointer select-none"
                        onClick={() => {
                                setExitButtonClicked(true);
                                extraFunction(); 
                            }
                        }>
                            {buttonTitle}
                        </button>                                  
                    }
                    </div> 
                </div>                 
            </div>
            : 
            null
        }         
        </>
    )
}

export default NotiPopup