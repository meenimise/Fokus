import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { removeVI, DefaultOption } from 'jsrmvi';
import Verified from '../../assets/others/verified.png';
import Moment from "react-moment";
//Firestore
// import { db } from '../../firebase/firebase.config';
// import * as fs from 'firebase/firestore';

function StoreItem({ id, name, avatar, caption, timestamp, img, points, itemsLeft }) {
    const { data: session, status } = useSession();

  return (
    <div className='relative flex justify-center items-center h-[300px] w-full'>
        <div className='flex justify-center items-center w-[90%] h-[90%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
        {
            img == null ?
            (
            <div className='w-[95%] h-[240px]'>
                <div className='h-full w-full'>
                    <div className='w-full h-[48px] columns-2'>
                        <div className='relative h-full w-full flex items-center pl-4'>
                            <div class="w-[32px] h-[32px] mr-[5%] flex items-center">
                                <img src={avatar} class="rounded-full" />
                            </div>
                    
                            <div className='w-full h-full flex items-center'>
                                <div className='truncate ... text-black font-poppins text-[10pt] font-medium select-none w-auto h-[50%] left-0 flex items-center'>
                                    {removeVI(name, { ignoreCase: false, replaceSpecialCharacters: false })}
                                </div>
                                <div class="w-[24px] h-[24px] ml-[1%]">
                                    <img src={Verified.src} className="w-full h-full scale-[60%]" />
                                </div>
                            </div>
                        </div>

                        <div className='relative h-full w-full text-grey font-poppins text-[9pt] font-normal select-none flex items-center flex-row-reverse pr-4'>
                            <Moment fromNow>{new Date(timestamp.seconds*1000)}</Moment>
                        </div>

                    </div>

                    <div className='w-full h-[144px] overflow-x-auto text-justify break-normal text-black font-poppins font-normal text-[10pt] p-4 scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey_message scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                        {caption}
                    </div>

                    <div className='w-full h-[48px] columns-2'>
                        <div className='relative h-full w-full text-steel_teal font-poppins text-[9pt] font-normal select-none flex items-center p-4'>
                            <p>
                                {points + " Fokus Points"}

                                <br>
                                </br>
                                
                                {itemsLeft + " left"}
                            </p>
                        </div>

                        <div className='relative h-full w-full columns-2 pr-4'>
                            <div className='h-full w-full flex items-center justify-center bg-white border-2 border-steel_teal hover:bg-morning_blue hover:cursor-pointer text-steel_teal hover:text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                Save 🛒
                            </div>                             
                            <div className='h-full w-full flex items-center justify-center bg-steel_teal hover:bg-morning_blue hover:cursor-pointer text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                Redeem
                            </div>                            
                        </div>                        
                    </div>                                        
                </div>
            </div>
            )
            :
            (
                <div className='w-[95%] h-[240px] columns-2'>
                    <img
                    className='h-full w-full rounded-[15px] object-cover'
                    src={img}
                    >
                    </img>
    
                        <div className='h-full w-full'>
                            <div className='w-full h-[48px] columns-2'>
                                <div className='relative h-full w-full flex items-center pl-4'>
                                    <div class="w-[32px] h-[32px] mr-[5%] flex items-center">
                                        <img src={avatar} class="rounded-full" />
                                    </div>
                            
                                    <div className='w-full h-full flex items-center'>
                                        <div className='truncate ... text-black font-poppins text-[10pt] font-medium select-none w-auto h-[50%] left-0 flex items-center'>
                                            {removeVI(name, { ignoreCase: false, replaceSpecialCharacters: false })}
                                        </div>
                                        <div class="w-[24px] h-[24px] ml-[1%]">
                                            <img src={Verified.src} className="w-full h-full scale-[60%]" />
                                        </div>
                                    </div>
                                </div>
        
                                <div className='relative h-full w-full text-grey font-poppins text-[9pt] font-normal select-none flex items-center flex-row-reverse pr-4'>
                                    <Moment fromNow>{new Date(timestamp.seconds*1000)}</Moment>
                            </div>
    
                        </div>
    
                        <div className='w-full h-[144px] overflow-x-auto text-justify break-normal text-black font-poppins font-normal text-[10pt] p-4 scrollbar-thin scrollbar-thumb-grey scrollbar-track-grey_message scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                            {caption}
                        </div>
    
                        <div className='w-full h-[48px] columns-2'>
                            <div className='relative h-full w-full text-steel_teal font-poppins text-[9pt] font-normal select-none flex items-center p-4'>
                                <p>
                                    {points + " Fokus Points"}
    
                                    <br>
                                    </br>
                                    
                                    {itemsLeft + " left"}
                                </p>
    
    
                            </div>
    
                            <div className='relative h-full w-full columns-2 pr-4'>
                                <div className='h-full w-full flex items-center justify-center bg-white border-2 border-steel_teal hover:bg-morning_blue hover:cursor-pointer text-steel_teal hover:text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                    Save 🛒
                                </div>                             
                                <div className='h-full w-full flex items-center justify-center bg-steel_teal hover:bg-morning_blue hover:cursor-pointer text-white font-poppins text-[9pt] font-medium select-none rounded-[15px]'>
                                    Redeem
                                </div>                                           
                            </div>                        
                        </div>                                        
                    </div>                        
                </div>                          
            )
        }              
        </div>                         
    </div>
  )
}

export default StoreItem