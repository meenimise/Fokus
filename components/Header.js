import React from 'react';
import {
  ChevronDownIcon
} from '@heroicons/react/solid';
import SampleAvt from '../assets/others/sample_avt.png'

function Header(props) {
  const headerText = props.headerText;
  return (
    <div className='relative mt-[10px] mx-auto w-[90%] h-[50px]'>
      <div className='absolute mt-[10px] h-[30px]'>
        <div className='text-black text-xl font-medium font-poppins'>
          {headerText}
        </div>
      </div>

      <div className='absolute right-0 h-full w-[250px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px] hover:cursor-pointer'>
        <img className='absolute mt-[9px] ml-[15px] w-[32px] h-[32px] rounded-full' src={SampleAvt.src}>
        </img>

        <div className='absolute left-[60px] w-[50%] top-[5px] text-sm font-medium font-poppins truncate ...'>
          Nguyen Tri Minh
        </div>

        <div className='absolute left-[60px] top-[25px] text-[#757575] text-xs font-poppins truncate ...'>
          Fokus Member
        </div>

        <div className='absolute top-[12px] right-[15px] h-[24px] w-[24px]' style={{color: '#757575'}}>
          <ChevronDownIcon></ChevronDownIcon>
        </div>
      </div>
    </div>
  )
}

export default Header