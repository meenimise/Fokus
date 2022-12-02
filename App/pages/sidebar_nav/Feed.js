import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '..';

function Feed() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {``
    return (
      <Sidebar>
        <div className="flex h-full flex-col justify-center items-center">
          <h1 className="text-4xl mb-5 font-bold">{"Fokus Feed"}</h1>
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Feed