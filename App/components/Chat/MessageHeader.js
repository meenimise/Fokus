import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { removeVI, DefaultOption } from 'jsrmvi';
// Firestore
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function MessageHeader(props) {
    const _userId = props._userId;

    const { data: session } = useSession();
    const currentUserId = session?.user.id;

    // Query to get user information
    const thisUserDocRef = fs.doc(db, "users", _userId);
    const thisUserDocSnap = fs.getDoc(thisUserDocRef);

    const [avatar, setAvatar] = useState();
    const [name, setName] = useState();

    thisUserDocSnap.then(doc => {
        setAvatar(doc.get('image'));
        setName(doc.get('name'));
    })

    return (
        _userId != currentUserId ?
        (
            <div className='flex items-center mt-[2%]'>
                <div class="w-[24px] h-[24px] mr-[2%]">
                    <img src={avatar} class="rounded-full" />
                </div>
        
                <div className='w-[30%] inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                    {name}
                </div>
            </div>
        )
        :
        (
            <div className='relative'></div>            
        )
    )
}

export default MessageHeader