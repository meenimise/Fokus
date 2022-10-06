import React from 'react';

function FirstMessageHeader(props) {
    const _isMyMessage = props._isMyMessage;
    const profileImgUrl = props.profileImgUrl;
    const username = props.username;

    return (
        _isMyMessage == false ?
        (
            <div className='flex items-center mt-[2%]'>
                <div class="w-[24px] h-[24px] mr-[2%]">
                    <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg" class="rounded-full" />
                </div>
        
                <div className='w-[30%] inline truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
                    Nguyen Tri Minh
                </div>
            </div>
        )
        :
        (
            <div className='relative'></div>            
        )
    )
}

export default FirstMessageHeader