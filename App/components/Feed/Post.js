import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { removeVI, DefaultOption } from 'jsrmvi';
import Image from "next/image";
import Moment from "react-moment";
//Icons
import {
    ArrowCircleUpIcon,
} from '@heroicons/react/solid';
//Firestore
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function Post({ id, userId, caption, timestamp, img }) {
    const { data: session, status } = useSession();
    const [hasLiked, setHasLiked] = useState(false);

    // Query to get user information
    const thisUserDocRef = fs.doc(db, "users", userId);
    const thisUserDocSnap = fs.getDoc(thisUserDocRef);

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();

    thisUserDocSnap.then(doc => {
        setAvatar(doc.get('image'));
        setName(doc.get('name'));
    })

  return (
    <div className='relative flex justify-center items-center h-[300px] w-full'>
        <div className='flex justify-center items-center w-[90%] h-[90%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
        {
            img == null ?
            (
            <div className='w-[95%] h-[240px]'>
                <div className='h-full w-full'>
                    <div className='w-full h-[48px] columns-2'>
                        <div className='relative h-full w-full flex items-center justify-center'>
                            <div class="w-[32px] h-[32px] mr-[5%]">
                                <img src={avatar} class="rounded-full" />
                            </div>
                    
                            <div className='w-full inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                                {removeVI(name, { ignoreCase: false, replaceSpecialCharacters: false })}
                            </div>
                        </div>

                        <div className='relative h-full w-full text-grey font-poppins text-[9pt] font-normal select-none flex items-center justify-center'>
                            <Moment fromNow>{timestamp?.toDate()}</Moment>
                        </div>

                    </div>

                    <div className='w-full h-[144px] overflow-x-auto text-justify break-normal text-black font-poppins font-normal text-[10pt] p-2'>
                        {caption}
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
                                <div className='relative h-full w-full flex items-center justify-center'>
                                    <div class="w-[32px] h-[32px] mr-[5%]">
                                        <img src={avatar} class="rounded-full" />
                                    </div>
                            
                                    <div className='w-full inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                                        {removeVI(name, { ignoreCase: false, replaceSpecialCharacters: false })}
                                    </div>
                                </div>
        
                                <div className='relative h-full w-full text-grey font-poppins text-[9pt] font-normal select-none flex items-center justify-center'>
                                    <Moment fromNow>{timestamp?.toDate()}</Moment>
                            </div>
    
                        </div>
    
                        <div className='w-full h-[144px] overflow-x-auto text-justify break-normal text-black font-poppins font-normal text-[10pt] p-2'>
                            {caption}
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
            )
        }              
        </div>                         
    </div>
  )
}

export default Post