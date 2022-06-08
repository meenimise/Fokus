import React, { useState } from 'react';
import Head from 'next/head';
//Authentication
import { useSession } from 'next-auth/react';
//Firebase
import { db } from '../../firebase/firebaseConfig';
import * as fs from 'firebase/firestore';
import { useRouter } from 'next/router';
//Icons
import {
  AdjustmentsIcon,
  PlayIcon,
  ShareIcon,
  CogIcon,
  LogoutIcon
} from '@heroicons/react/solid';
import { theme } from '../../tailwind.config';
//Components
import Header from '../../components/Header';
import SignIn from '../others/SignIn';

function Session() {
  const { data: session, status } = useSession();
  const [isSessionAdmin, setSessionAdmin] = useState(true);
  const [isTimeAdjusted, setTime] = useState(false);
  const [isSessionStarted, setSessionStarted] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionPrivacy, setSessionPrivacy] = useState("");
  const router = useRouter();
  const sessionId = router.asPath.replace("/sessions/", "");
  const docRef = fs.doc(db, "fkSessions", sessionId);
  var time = "00 : 00";

  fs.getDoc(docRef).then((doc) => {
      setSessionName(doc.get("name"));
      setSessionPrivacy(doc.get("privacy"));
  });

  if (status === "loading") {
    return(null)
  }

  if (status === "authenticated") {
    return (
      <>
        {
          sessionPrivacy === "private" ?
          <Header headerText={'Session: ' + sessionName + ' 🔒'}>
          </Header>
          :
          <Header headerText={'Session: ' + sessionName + ' 🌎'}>
          </Header>
        }

        <div className='relative mt-[20px] w-[90%] h-[80%] mx-auto'>
          <div className='absolute w-full h-[75%]'>
            <div className='absolute h-full w-[49%] bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)]'>

            </div>

            <div className='absolute right-0 h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)]'>
            {
              isSessionAdmin === true ?
              <div className='absolute w-[80%] h-[80%]'>
                <div className='absolute w-full h-[50%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)]'>
                  <h1 className='font-poppins font-semibold text-8xl text-[#8E8EC8] select-none truncate ...'>
                    {time}
                  </h1>
                </div>

                <div className='absolute bottom-0 w-full h-[50%] flex items-center justify-center'>
                  <div className='absolute w-full h-[40%]'>
                    <div className='absolute h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] hover:cursor-pointer hover:bg-purple_light'>
                      <div className='absolute h-[40px] w-[90%]'>
                        <div className='absolute h-full w-[40px]'>
                          <AdjustmentsIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.purple}}>
                          </AdjustmentsIcon>
                        </div>

                        <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                          <h1 className='font-poppins font-medium text-[10.5pt] text-[#8E8EC8] truncate ... select-none'>
                            Adjust Session Time
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className='absolute right-0 h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] hover:cursor-pointer hover:bg-purple_light'>
                      <div className='absolute h-[40px] w-[90%]'>
                          <div className='absolute h-full w-[40px]'>
                            <PlayIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.purple}}>
                            </PlayIcon>
                          </div>

                          <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                            <h1 className='font-poppins font-medium text-[10.5pt] text-[#8E8EC8] truncate ... select-none'>
                              Start This Session
                            </h1>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='absolute w-[80%] h-[80%]'>
                <div className='absolute w-full h-full flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)]'>
                  <h1 className='font-poppins font-semibold text-8xl text-[#8E8EC8] select-none truncate ...'>
                    {time}
                  </h1>
                </div>
              </div>
            }
            </div>            
          </div>

          <div className='absolute bottom-0 w-full h-[20%] flex items-center justify-center'>
            <div className='absolute w-[80%] h-[55%]'>
              <div className='absolute h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] hover:cursor-pointer hover:bg-purple_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <ShareIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.purple}}>
                    </ShareIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-[#8E8EC8] truncate ... select-none'>
                      Invite Your Friends To Join
                    </h1>
                  </div>
                </div>
              </div>

              <div className='absolute left-[35%] h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] hover:cursor-pointer hover:bg-purple_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <CogIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.purple}}>
                    </CogIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-[#8E8EC8] truncate ... select-none'>
                      Session Configuration
                    </h1>
                  </div>
                </div>
              </div>

              <div className='absolute right-0 h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] hover:cursor-pointer hover:bg-purple_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <LogoutIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: '#FA3E3E'}}>
                    </LogoutIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-[#FA3E3E] truncate ... select-none'>
                      Exit Or Give Up This Session
                    </h1>
                  </div>
                </div>
              </div>                              
            </div>
          </div>
        </div>      
      </>
    );
  }

  return(
    <div>
      <Head>
          <title>Fokus | Sign In</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignIn></SignIn>
    </div>
  );
}

export default Session