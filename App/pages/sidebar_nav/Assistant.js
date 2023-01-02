import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
import MessageArea from '../../components/ChatBot/MessageArea';

function Settings() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if(status === "authenticated") {
    return (
      <Sidebar>
        <div className="flex h-full flex-col justify-center items-center">
          <div className='h-[95%] w-[95%] flex justify-center items-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
            <div className='fixed h-[95%] w-full flex justify-center items-center'>
              <MessageArea></MessageArea>
            </div>
          </div>
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Settings