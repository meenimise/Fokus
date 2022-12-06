import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '..';
import Header from '../../components/Header';
import CreatePost from '../../components/Feed/CreatePost';
import Post from '../../components/Feed/Post';

function Feed() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        <Header headerText={'My Feed 📰'}>
        </Header>
        
        <div className='relative h-[460px] w-full items-center justify-center overflow-auto scroll-smooth'>
          <CreatePost>
          </CreatePost>

          <Post>
          </Post>
          
          <Post>
          </Post>

          <Post>
          </Post>

          <Post>
          </Post>
          
          <Post>
          </Post>

          <Post>
          </Post>

          <Post>
          </Post>
          
          <Post>
          </Post>

          <Post>
          </Post>                                                                                                                                                                           
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Feed