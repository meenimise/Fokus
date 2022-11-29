import React from 'react';
import {
  ChevronDownIcon
} from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { removeVI, DefaultOption } from 'jsrmvi';

function Header(props) {
  const { data: session } = useSession();
  const headerText = props.headerText;
  const name = session?.user.name.split(' ');

  return (
    <div className='relative mt-[10px] mx-auto w-[90%] h-[50px]'>
      <div className='absolute mt-[10px] h-[30px]'>
        <div className='text-black text-xl font-medium font-poppins truncate select-none ...'>
          {headerText}
        </div>
      </div>

      <div className='absolute right-0 h-full w-[250px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px] hover:cursor-pointer' onClick={() => signOut()}>
        <img className='absolute mt-[9px] ml-[15px] w-[32px] h-[32px] rounded-full' src={session?.user.image}>
        </img>

        <div className='absolute left-[60px] w-[50%] top-[5px] text-sm font-medium font-poppins truncate select-none ...'>
          {name.length <= 2 ? removeVI(name[0], { ignoreCase: false, replaceSpecialCharacters: false }) : removeVI(name[0] + " " + name[1], { ignoreCase: false, replaceSpecialCharacters: false })}
        </div>

        <div className='absolute left-[60px] top-[25px] text-[#757575] text-xs font-poppins truncate select-none ...'>
          {"Fokus Member"}
        </div>

        <div className='absolute top-[12px] right-[15px] h-[24px] w-[24px]' style={{color: '#757575'}}>
          <ChevronDownIcon></ChevronDownIcon>
        </div>
      </div>
    </div>
  )
}

export default Header