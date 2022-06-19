import React from 'react';
import Sidebar from '../../components/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
//Components
import PieChart from '../../components/PieChart';

function TimeManagement() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        <div className="flex h-full flex-col justify-center items-center">
          <PieChart></PieChart>
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default TimeManagement