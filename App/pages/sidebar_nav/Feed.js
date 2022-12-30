import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '..';
import Header from '../../components/Header';
import CreatePost from '../../components/Feed/CreatePost';
import Post from '../../components/Feed/Post';
import NotiPopup from '../../components/NotiPopup';
import CommentArea from '../../components/Comment/CommentArea';
//Firebase
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function Feed() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);

  const [isCommentClicked, setCommentClicked] = useState(false);

  const [thisPostId, setThisPostId] = useState("");

  const commentClickState = (state) => {
    setCommentClicked(state);
  }

  const getThisPostId = (id) => {
    setThisPostId(id);
  }

  useEffect(() => {
    const unSubscribe = fs.onSnapshot(
      fs.query(fs.collection(db, "posts"), fs.orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unSubscribe();
    };
  }, [db]);

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        {/* Popup comments section */}
        {
          isCommentClicked == true ?
          <NotiPopup
              notiTitle="Comments"
              hasButton={false}
              hasExitButton={true}
              notiInfo={
                <CommentArea
                  postId={thisPostId}
                >
                </CommentArea>
              }
              extraFunctionOnClosed={() => setCommentClicked(false)}
          >
          </NotiPopup>
          :
          null
        }

        <Header headerText={'My Feed 📰'}>
        </Header>
        
        <div className='relative h-[460px] w-full items-center justify-center overflow-auto scroll-smooth'>
          <CreatePost>
          </CreatePost>

          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userId={post.data().userId}
              img={post.data().image}
              caption={post.data().caption}
              timestamp={post.data().timestamp}
              commentClickState={commentClickState}
              getThisPostId={getThisPostId}
            />
          ))}
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default Feed