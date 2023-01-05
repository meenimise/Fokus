import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import { theme } from '../../tailwind.config';
import { removeVI, DefaultOption } from 'jsrmvi';
//Icons
import {
  PhotographIcon,
} from '@heroicons/react/solid';
//Firestore
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';
//Firebase Storage
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from '../../firebase/firebase.config';

function CreatePost() {
    const { data: session, status } = useSession();

    const [caption, captionInputProps] = useTextForm("");
    
    const [isBeingProcessed, setIsBeingProcessed] = useState(false);

    const imageRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);

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

    //Add the image to state
    const addImageToState = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImageName(e.target.files[0].name);
        }
        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result);
        };
    };
    //Create data of post and add it to the collection
    const uploadPost = async () => {
        setIsBeingProcessed(true);
        const docRef = await fs.addDoc(fs.collection(db, "posts"), {
            userId: session?.user?.id,
            caption: caption,
            timestamp: fs.serverTimestamp(),
        });

        if (image != null) {
            //Path for the image
            const imagePath = ref(storage, `posts/${docRef.id}/image`);

            //Upload image to that adress
            //Then with the snapshot declare the download URL
            await uploadString(imagePath, image, "data_url").then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imagePath);
                await fs.updateDoc(fs.doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        }
        setImage("");
        setImageName("");
        setIsBeingProcessed(false);
    };

    return (
    <div className='flex justify-center items-center h-[300px] w-full'>
        <div className='relative w-[90%] h-[90%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
            <div className='h-[30%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
            {"Create Post"}                                
            </div>

            <div className='relative h-[20%] w-full flex items-center justify-center'>
                <div className='h-[50%] w-[90%]'>
                    <div className='h-[40px] w-full flex items-center justify-center'>
                        { 
                        isBeingProcessed == false ?
                        <div className='relative flex w-full h-full'>
                            <input placeholder={"What's on your mind " + session?.user.name + "?"} 
                            type="text" 
                            name="caption" 
                            id="caption" 
                            class="inline-block bg-white border-[2px] focus:outline-steel_teal text-sm font-poppins rounded-lg h-full w-[94%] p-2.5 break-words" 
                            {...captionInputProps}
                            />

                            <div className='absolute h-full w-[40px] right-0 rounded-[8px] hover:cursor-pointer hover:bg-morning_blue bg-[#6A8D92]' 
                            style={{color: "#ffffff"}}
                            onClick={() => imageRef.current.click()}
                            >
                            <PhotographIcon className="scale-75">
                            </PhotographIcon>

                            <input
                                type="file"
                                className="hidden"
                                onChange={addImageToState}
                                ref={imageRef}
                            >
                            </input>
                            </div>
                        </div>
                        :
                        <input 
                        type="text" 
                        name="caption" 
                        id="caption" 
                        class="inline-block bg-slate-100 border-[2px] text-sm text-grey font-poppins rounded-lg h-full w-full p-2.5" 
                        value={caption}
                        disabled
                        />
                        }                                
                    </div>
                </div>
            </div>

            <div className='relative h-[50%] w-[90%] mx-auto flex items-center justify-center'>
            {
                (caption == "") ?
                <>
                {
                    (image != null) ?
                    <>
                    <div className='absolute flex left-0 w-[100px] h-[100px] object-cover'>
                        <Image
                        className='rounded-[15px] object-cover'
                        width="100"
                        height="100"
                        src={image}
                        >
                        </Image>
                    </div>

                    <div className='relative flex text-sm font-poppins select-none truncate'>
                        {imageName}
                    </div>
                    </>
                    :
                    ""
                }
                <button type="button" class="absolute flex items-center justify-center right-0 w-[10%] h-[30%] bg-grey opacity-30 rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                    {"Post"}
                </button>                      
                </>
                :
                (
                isBeingProcessed == false ?
                <>
                    {
                    (image != null) ?
                    <>
                        <div className='absolute flex left-0 w-[100px] h-[100px]'>
                        <Image
                        className='rounded-[15px] object-cover'
                        width="100"
                        height="100"
                        src={image}
                        >
                        </Image>
                        </div>

                        <div className='relative flex text-sm font-poppins select-none truncate'>
                        {imageName}
                        </div>
                    </>
                    :
                    ""
                    }
                    <button type="button" class="absolute flex items-center justify-center right-0 w-[10%] h-[30%] bg-steel_teal rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-morning_blue hover:cursor-pointer select-none"
                        onClick={() => { 
                                uploadPost(); 
                            }
                        }>
                    {"Post"}
                    </button>                   
                </>
                :
                <>
                    {
                    (image != null) ?
                    <>
                        <div className='absolute flex left-0 w-[100px] h-[100px]'>
                        <Image
                        className='rounded-[15px] object-cover'
                        width="100"
                        height="100"
                        src={image}
                        >
                        </Image>
                        </div>

                        <div className='relative flex text-sm font-poppins select-none truncate'>
                        {imageName}
                        </div>   
                    </>                         
                    :
                    ""
                    }
                    <button type="button" class="absolute flex items-center justify-center right-0 w-[16%] h-[30%] bg-grey rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>

                    {"Posting..."}
                    </button>                   
                </>                                  
                )
            }
            </div>                            
        </div>
    </div>
    )
}

export default CreatePost