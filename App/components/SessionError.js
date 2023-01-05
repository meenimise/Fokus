import React from 'react';
import NotFound from '../assets/svgs/not_found.svg';

function SessionError() {
  return (
  <div className='flex justify-center items-center w-screen h-screen'>
      <div className=' w-[70%] h-full'>
          <div className='w-full h-[70%] pt-[3%]'>
              <NotFound className='w-full h-full'></NotFound>
          </div>

          <div className='flex justify-center items-center w-full h-[30%] mx-auto font-poppins font-medium text-pleased_green text-[13pt] select-none overflow-x-clip break-normal'>
              It seems that you've accessed an invalid session or the session is a private session of another user. Please try again and make sure the session is valid and it must be yours or public.
          </div>
      </div>
    </div>
  )
}

export default SessionError