import React, { useState, useEffect } from 'react';
import Head from 'next/head';
//Authentication
import { useSession } from 'next-auth/react';
//Firebase
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';
import { useRouter } from 'next/router';
//Icons
import {
  AdjustmentsIcon,
  PlayIcon,
  ShareIcon,
  CogIcon,
  LogoutIcon,
  XCircleIcon
} from '@heroicons/react/solid';
import { theme } from '../../tailwind.config';
//Components
import Header from '../../components/Header';
import SignIn from '../others/SignIn';
import NotiPopup from '../../components/NotiPopup';
import SessionError from '../../components/SessionError';
import ChatArea from '../../components/Chat/ChatArea';
import { doc } from 'firebase/firestore';

function Session() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  //States related
  const [adminId, setAdminId] = useState(null);
  const currentTime = Date.now();
  const [areAllUsersReady, setUsersReadyState] = useState(false);
  const [timeCompleted, setTimeCompleted] = useState();
  const [latestTimeJoined, setLatestTimeJoined] = useState("");
  const [sessionStartedTime, setSessionStartedTime] = useState();
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isAchievementCreated, setAchievementCreated] = useState(false);
  const [isTimeAdjusted, setTime] = useState(false);
  const [isSessionStarted, setSessionStarted] = useState(false);
  const [isSessionEnded, setSessionEnded] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionPrivacy, setSessionPrivacy] = useState("");

  //Popups-related
  const [isConfirmClicked, setConfirmClicked] = useState(false); //Radius buttons popup
  const [isAdjustTimeClicked, setAdjustTimeClicked] = useState(false); //Radius buttons popup
  const [isStartSessionClicked, setStartSessionClicked] = useState(false); //Noti popup
  const [isExitClicked, setExitClicked] = useState(false); //Noti popup
  const [isSessionConfigClicked, setSessionConfigClicked] = useState(false); //Multi options popup
  const [isInviteFriendsClicked, setInviteFriendsClicked] = useState(false); //Text copy popup

  //Main funcs & variables
  function useRadioButtons(name) {
    const [value, setState] = useState(null);
  
    const handleChange = e => {
      setState(e.target.value);
    };
  
    const inputProps = {
      name,
      type: "radio",
      onChange: handleChange
    };
  
    return [value, inputProps];
  }

  const[timeValue, timeInputProps] = useRadioButtons();

  function navigateToHome() {
    router.push("/"); 
  }

  //Create user achievement
  async function createUserAchievement() {
    if (session?.user.id != null) {
      const userJoinedDocRef = fs.doc(usersJoinedColRef, session?.user.id);
      fs.updateDoc(userJoinedDocRef, "isAchievementCreated", true);

      const usersColRef = fs.collection(db, "fkUsers");
      fs.setDoc(fs.doc(usersColRef, session?.user.id), {
      }).then(() => {
        const userDocRef = fs.doc(usersColRef, session?.user.id);
        const achievementDocRef = fs.doc(fs.collection(userDocRef, "achievements"));
        fs.setDoc(
          achievementDocRef, 
          {
            time: timeCounter,
            timeCompleted: timeCompleted
          }
        );
      })
    }
  }

  useEffect(() => {
    if (timeCompleted != null && isAchievementCreated === false && hasCompleted === true) {
      createUserAchievement().then(() => {
        navigateToHome();
      });
    }
  }, [timeCompleted, hasCompleted]);

  //Set completed time for user
  function setUserCompleted() {
    if (hasCompleted === false) {
      if (session?.user.id != null) {
        const userJoinedDocRef = fs.doc(usersJoinedColRef, session?.user.id);
        fs.updateDoc(userJoinedDocRef, "timeCompleted", currentTime).then(() => {
          fs.updateDoc(userJoinedDocRef, "hasCompleted", true);
        });
      }
    }
    else {
      navigateToHome();
    }
  }
  

  //Handle latest time joined by user
  function startupConfirmed() {
    setConfirmClicked(true);
    if (session?.user.id != null) {
      const userJoinedDocRef = fs.doc(usersJoinedColRef, session?.user.id);
      fs.updateDoc(userJoinedDocRef, "isReady", true);
    }
    if (session?.user.id != null) {
      if (hasCompleted === false) {
        const userJoinedDocRef = fs.doc(usersJoinedColRef, session?.user.id);
        fs.updateDoc(userJoinedDocRef, "latestTimeJoined", currentTime);
      }
    }
  }

  //Compare session started time to latest time joined by user
  function hasUserLeft() {
    if (latestTimeJoined <= sessionStartedTime) {
      return false;
    }
    else {
      return true;
    }
  }

  //Check if all users are ready
  function checkIfAllUsersAreReady() {
    const q2 = fs.query(usersJoinedColRef, fs.where("isReady", "==", false));
    const querySnapshot2 = fs.getDocs(q2)
    querySnapshot2.then((query) => {
      if (query.empty) {
        setUsersReadyState(true);
      }
      else {
        setUsersReadyState(false);
      }
    });
  }

  //Final dialog conditions
  function canCongratsDialogBeShown() {
    if (hasUserLeft() === true) {
      return false;
    }
    else {
      return true;
    }
  }

  //Counter related
  const [timeCounter, setTimeCounter] = useState(null);
  let [timeCounterLocal, setTimeCounterLocal] = useState(null);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  function updateTime() {
    fs.updateDoc(docRef, "time", parseInt(timeValue));
  }

  function convertTimer(time) {
    var min = Math.floor(time / 60);
    var sec = time % 60;
    min < 10 ? setMinutes("0" + min) : setMinutes(min);
    sec < 10 ? setSeconds("0" + sec) : setSeconds(sec);
  }

  function updateTimer(time) {
    convertTimer(time);
  }

  useEffect(() => {
    setTimeCounterLocal(timeCounter);
    updateTimer(timeCounter);
  }, [timeCounter]);

  useEffect(() => {
    if (isSessionStarted) {
      setInterval(controlCountDown, 1000);
    }
  }, [isSessionStarted]);

  function controlCountDown() {
    if (timeCounterLocal != 0) {
      setTimeCounterLocal(timeCounterLocal--);
      convertTimer(timeCounterLocal);
    }
    endSession();
  }

  function openStartSessionPopUp() {
    checkIfAllUsersAreReady();
    setStartSessionClicked(true);
  }

  function startSession() {
    setStartSessionClicked(false);
    if (timeCounterLocal != 0) {
      if (areAllUsersReady === true) {
        fs.updateDoc(docRef, "isSessionStarted", true);
        fs.updateDoc(docRef, "startedTime", currentTime);
      }
    }     
  }

  function endSession() {
    if (timeCounterLocal === 0) {
      fs.updateDoc(docRef, "isSessionEnded", true);
    }
  }

  //Initialize realtime data from Firestore
  const sessionId = router.asPath.replace("/sessions/", "");
  const docRef = fs.doc(db, "fkSessions", sessionId);
  
  fs.onSnapshot(docRef, (doc) => {
    setSessionName(doc.get("name"));
    setSessionPrivacy(doc.get("privacy"));
    setTimeCounter(doc.get("time"));
    setSessionStarted(doc.get("isSessionStarted"));
    setSessionEnded(doc.get("isSessionEnded"));
    setSessionStartedTime(doc.get("startedTime"));
  });

  //Get session admin id
  const usersJoinedColRef = fs.collection(docRef, "usersJoined");
  const q1 = fs.query(usersJoinedColRef, fs.where("isAdmin", "==", true));
  const querySnapshot1 = fs.getDocs(q1);
  querySnapshot1.then((query) => {
    query.forEach((doc) => {
      setAdminId(doc.id);
    });
  });

  //Add non-admin user to session
  if (session?.user.id != null && adminId != null) {
    const userJoinedDocRef = fs.doc(usersJoinedColRef, session?.user.id);
    if (session?.user.id != adminId) {
      if (isConfirmClicked === false) {
        if (isSessionEnded === false) {
          fs.setDoc(
            userJoinedDocRef,
            {
                id: session?.user.id,
                isAdmin: false,
                hasCompleted: false,
                isReady: false,
                isAchievementCreated: false
            }
          );
        }
      }
    }

    fs.onSnapshot(userJoinedDocRef, (doc) => {
      setHasCompleted(doc.get("hasCompleted"));
      setLatestTimeJoined(doc.get("latestTimeJoined"));
      setTimeCompleted(doc.get("timeCompleted"));
      setAchievementCreated(doc.get("isAchievementCreated"));
    });
  }

  function displaySession() {
    return(
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
            <div className='absolute h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
              <ChatArea
                sessionId={sessionId}
              >
              </ChatArea>
            </div>

            <div className='absolute right-0 h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
            {
              session?.user.id === adminId ?
              <div className='absolute w-[80%] h-[80%]'>
                <div className='absolute w-full h-[50%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
                  <h1 className='font-poppins font-semibold text-8xl text-steel_teal select-none truncate ...'>
                  {minutes + " : " + seconds}
                  </h1>
                </div>

                <div className='absolute bottom-0 w-full h-[50%] flex items-center justify-center'>
                  <div className='absolute w-full h-[40%]'>
                    <div className='absolute h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer hover:bg-light_morning_blue' onClick={() => setAdjustTimeClicked(true)}>
                      <div className='absolute h-[40px] w-[90%]'>
                        <div className='absolute h-full w-[40px]'>
                          <AdjustmentsIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.steel_teal}}>
                          </AdjustmentsIcon>
                        </div>

                        <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                          <h1 className='font-poppins font-medium text-[10.5pt] text-steel_teal truncate ... select-none'>
                            {"Adjust Session Time"}
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className='absolute right-0 h-full w-[49%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer hover:bg-light_morning_blue'
                    onClick={() => 
                      {
                        openStartSessionPopUp();
                      }
                    }
                    >
                      <div className='absolute h-[40px] w-[90%]'>
                          <div className='absolute h-full w-[40px]'>
                            <PlayIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.steel_teal}}>
                            </PlayIcon>
                          </div>

                          <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                            <h1 className='font-poppins font-medium text-[10.5pt] text-steel_teal truncate ... select-none'>
                              {"Start This Session"}
                            </h1>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='absolute w-[80%] h-[80%]'>
                <div className='absolute w-full h-full flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)]'>
                  <h1 className='font-poppins font-semibold text-8xl text-steel_teal select-none truncate ...'>
                    {minutes + " : " + seconds}
                  </h1>
                </div>
              </div>
            }
            </div>            
          </div>

          <div className='absolute bottom-0 w-full h-[20%] flex items-center justify-center'>
            <div className='absolute w-[80%] h-[55%]'>
              <div className='absolute h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer hover:bg-steel_teal_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <ShareIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.steel_teal}}>
                    </ShareIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-steel_teal truncate ... select-none'>
                      {"Invite Your Friends To Join"}
                    </h1>
                  </div>
                </div>
              </div>

              <div className='absolute left-[35%] h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer hover:bg-steel_teal_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <CogIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: theme.extend.colors.steel_teal}}>
                    </CogIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-steel_teal truncate ... select-none'>
                      {"Session Configuration"}
                    </h1>
                  </div>
                </div>
              </div>

              <div className='absolute right-0 h-full w-[30%] flex items-center justify-center bg-white rounded-[15px] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] hover:cursor-pointer hover:bg-steel_teal_light'>
                <div className='absolute h-[40px] w-[90%]'>
                  <div className='absolute h-full w-[40px]'>
                    <LogoutIcon className='absolute w-full h-full scale-[60%] overflow-auto' style={{color: '#FA3E3E'}}>
                    </LogoutIcon>
                  </div>

                  <div className='absolute right-0 h-full w-[80%] flex items-center justify-center'>
                    <h1 className='font-poppins font-medium text-[10.5pt] text-[#FA3E3E] truncate ... select-none'>
                      {"Give Up This Session"}
                    </h1>
                  </div>
                </div>
              </div>                              
            </div>
          </div>

          {/* Popups area */}

          {/* Adjust Time popup */}
          {
            isAdjustTimeClicked ==  true ?
            <div className='relative flex items-center justify-center h-full w-full'>
              <div className='absolute w-[60%] h-[85%] drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px]'>
                <div className='h-[15%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
                    Adjust Session Time

                    <div className='absolute right-[15px] h-[40px] w-[40px] hover:cursor-pointer' style={{color: theme.extend.colors.steel_teal}} onMouseOver={({target})=>target.style.color=theme.extend.colors.morning_blue} onMouseOut={({target})=>target.style.color=theme.extend.colors.steel_teal}
                    onClick={() => setAdjustTimeClicked(false)}
                    >
                        <XCircleIcon></XCircleIcon>
                    </div>                                  
                </div>

                <div className='relative h-[70%] w-[90%] mx-auto flex items-center justify-center'>
                  <div className='h-[70%] w-[90%]'>
                      <div className='h-full w-full'>
                          <form className='relative w-full h-full'>
                              <label for="time" class="block mb-2 text-sm font-poppins font-medium select-none truncate ...">{"Choose the amount of time (10s is just for demo only)"}</label>

                              <div class="w-full h-full flex items-center justify-center">
                                  <div class="absolute left-0 form-check form-check-inline">
                                      <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-steel_teal checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeRadioOptions" id="time1" value="10" checked={timeValue === "10"} {...timeInputProps}/>
                                      <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio10">10 secs</label>
                                  </div>

                                  <div class="absolute left-[28%] form-check form-check-inline">
                                      <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-steel_teal checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeRadioOptions" id="time2" value="1800" checked={timeValue === "1800"} {...timeInputProps}/>
                                      <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio20">30 mins</label>
                                  </div>

                                  <div class="absolute right-[28%] form-check form-check-inline">
                                      <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-steel_teal checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeRadioOptions" id="time3" value="2700" checked={timeValue === "2700"} {...timeInputProps}/>
                                      <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio20">45 mins</label>
                                  </div>

                                  <div class="absolute right-0 form-check form-check-inline">
                                      <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-steel_teal checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="timeRadioOptions" id="time3" value="3600" checked={timeValue === "3600"} {...timeInputProps}/>
                                      <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio20">60 mins</label>
                                  </div>                                                                     
                              </div>                                            
                          </form>                                        
                      </div>
                  </div>
                </div>

                <div className='relative h-[15%] w-[90%] mx-auto flex items-center justify-center'>
                {
                    timeValue === null ?
                    <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-grey opacity-30 rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                        {"Set Time"}
                    </button>
                    :
                    <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-steel_teal rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-morning_blue hover:cursor-pointer select-none"
                    onClick={() => {
                          setTime(true);
                          updateTime(timeValue);
                          setAdjustTimeClicked(false);  
                        }
                    }>
                        {"Set Time"}
                    </button>                                  
                }
                </div> 
              </div>                 
            </div>
            : null
          }

          {/* Confirm completed session popup */}
          {
            isConfirmClicked == true ? 
            (
              canCongratsDialogBeShown() === true ?
              (isSessionEnded === true ?
                <NotiPopup 
                  hasExitButton={false}
                  notiTitle="Congratulations"
                  hasButton={true}
                  buttonTitle="I have completed"
                  notiInfo="Hi there! Congratulation, you have completed this session. 
                  Thanks for your great efforts and please keep going, never give up! Please do not leave this site, 
                  reload it or navigate to any other pages without comfirming that you have completed this session, because
                  this achievement won't be included for you. So now please click the button below to confirm it
                  as soon as possible. You will be navigated to the home page soon to begin with another one. Thank you!"
                  extraFunction={setUserCompleted}
                >
                </NotiPopup>
                :
                null
              )
              :
              <NotiPopup 
                hasExitButton={false}
                notiTitle="You have failed"
                hasButton={true}
                buttonTitle="I will try again"
                notiInfo="It looks like you have left this session before it ended, or you join while it is still running. As we said, your result
                won't be included for you. We are sorry about that and hope you won't give up next time. You will be navigated to 
                the home page soon to begin with another one. Thank you!"
                extraFunction={navigateToHome}
              >
              </NotiPopup>   
            )
            : null
          }

          {/* Confirmed at startup popup */}
            <NotiPopup 
              hasExitButton={false}
              notiTitle="Before you start"
              hasButton={true}
              buttonTitle="I understand"
              notiInfo="Hi there! Before you start please keep these things in mind: when the
              session starts do not leave this session by reloading, navigating to another pages or closing the browser. Because
              your result won't be included for you. Now please click the button I UNDERSTAND below now to confirm that
              you have understood. If you are the session Admin please make sure all the users in this session are ready
              including you so that you can start this session. Thank you and good luck!"
              extraFunction={startupConfirmed}
            >
            </NotiPopup>

            {/* Confirm start session popup */}
            {
              isStartSessionClicked === true ?
              <NotiPopup 
                hasExitButton={true}
                notiTitle="Do you want to start this session?"
                hasButton={true}
                buttonTitle="Start session"
                notiInfo="Please make sure all other members have pressed the I UNDERSTAND button
                to be ready. Then you just need to press the button below to start this session."
                extraFunction={startSession}
              >
              </NotiPopup> 
              : null 
            }            
        </div>   
      </>      
    );
  }

  if (status === "loading") {
    return(null)
  }

  if (status === "authenticated") {
    return (
      (session?.user.id === adminId) || (session?.user.id != adminId && sessionPrivacy === "public") ?
      displaySession()
      :
      <SessionError></SessionError>
    );
  }

  return(
    <div>
      <Head>
          <title>{"Fokus | Sign In"}</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignIn></SignIn>
    </div>
  );
}

export default Session