import React, { useState } from 'react';

function MessageHeader() {
    const [avatar, setAvatar] = useState("https://i.ibb.co/9gSb2Gh/ezgif-com-gif-maker.png");
    const [name, setName] = useState("Foxy");

    return (
        <div className='flex items-center mt-[2%]'>
            <div class="w-[24px] h-[24px] mr-[2%]">
                <img src={avatar} class="rounded-full" />
            </div>

            <div className='w-[30%] inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                {name}
            </div>
        </div>
    )
}

export default MessageHeader