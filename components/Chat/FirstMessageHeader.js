import React from 'react';

function FirstMessageHeader(props) {
  const profileImgUrl = props.profileImgUrl;
  const username = props.username;

  return (
    <div className='relative w-full h-[30px]'>
        <div className='absolute h-full aspect-square'>
            <img className='absolute object-cover h-full w-full rounded-full' 
                src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F08%2F24%2Fcorgi-puppy-on-floor-512536165-2000.jpg'
            >
            </img>
        </div>

        <div className='relative left-[40px] h-full w-[70%] inline-block align-middle truncate ... text-black font-poppins text-[10pt] font-medium select-none'>
            Nguyen Tri Minh
        </div>
    </div>
  )
}

export default FirstMessageHeader