import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { removeVI, DefaultOption } from 'jsrmvi';
import Image from "next/image";
import Moment from "react-moment";
//Icons
import {
    ArrowCircleUpIcon,
} from '@heroicons/react/solid';

function Post() {
    const { data: session, status } = useSession();
    const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className='relative flex justify-center items-center h-[300px] w-full'>
        <div className='flex justify-center items-center w-[90%] h-[90%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
            <div className='columns-2 w-[95%] h-[240px]'>
                <img
                className='h-full w-full rounded-[15px] object-fill'
                src='https://live-production.wcms.abc-cdn.net.au/11bea9410703c89775ed98d4d32c6321?impolicy=wcms_crop_resize&cropH=1680&cropW=2983&xPos=17&yPos=137&width=862&height=485'
                >
                </img>

                <div className='h-full w-full'>
                    <div className='w-full h-[48px] columns-2'>
                        <div className='relative h-full w-full flex items-center justify-center'>
                            <div class="w-[32px] h-[32px] mr-[5%]">
                                <img src={session?.user.image} class="rounded-full" />
                            </div>
                    
                            <div className='w-full inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                                {removeVI(session?.user.name, { ignoreCase: false, replaceSpecialCharacters: false })}
                            </div>
                        </div>

                        <div className='relative h-full w-full text-grey font-poppins text-[9pt] font-normal select-none flex items-center justify-center'>
                            Just Now
                        </div>

                    </div>

                    <div className='w-full h-[144px] overflow-x-auto text-justify break-normal text-black font-poppins font-normal text-[10pt] p-2'>
                        There was a leak in the boat. Nobody had yet noticed it, and nobody would for the next couple of hours. This was a problem since the boat was heading out to sea and while the leak was quite small at the moment, it would be much larger when it was ultimately discovered. John had planned it exactly this way.
                    </div>

                    <div className='w-full h-[48px] columns-2'>
                        <div className='relative h-full w-full text-steel_teal font-poppins text-[9pt] font-normal select-none flex items-center justify-center'>
                            <p>
                                100 upvotes

                                <br>
                                </br>
                                
                                500 comments
                            </p>


                        </div>

                        <div className='relative h-full w-full columns-2'>
                            <div className='h-full w-full flex items-center justify-center bg-steel_teal hover:bg-morning_blue hover:cursor-pointer text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                Upvote 🚀
                            </div>

                            <div className='h-full w-full flex items-center justify-center bg-steel_teal hover:bg-morning_blue hover:cursor-pointer text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                Comment
                            </div>                            
                        </div>                        
                    </div>                                        
                </div>                
            </div>                         
        </div>
    </div>
  )
}

export default Post