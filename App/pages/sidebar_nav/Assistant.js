import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
import MessageArea from '../../components/ChatBot/MessageArea';
import { fetchQuery } from '../../utils/helper';

function Assistant({ interchanges }) {
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
          <div className='h-[93%] w-[90%] flex justify-center items-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
            <div className='fixed h-[95%] w-full flex justify-center items-center'>
              <MessageArea interchanges={interchanges}></MessageArea>
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

export default Assistant

export async function getServerSideProps() {
  const interchanges = await fetchQuery('interchanges');
  return {
      props: { 
        interchanges: interchanges
      },
  };
}