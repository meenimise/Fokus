import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import SignIn from './others/SignIn';
import Header from '../components/Header';
import Logo from '../assets/svgs/fokus_logo.svg';
import { removeVI, DefaultOption } from 'jsrmvi';
//Icons
import {
    ClockIcon,
    CheckCircleIcon,
    StarIcon,
    PlusCircleIcon,
    ViewGridAddIcon,
    XCircleIcon,
  } from '@heroicons/react/solid';
import { theme } from '../tailwind.config';
//Authentication
import { useSession } from 'next-auth/react';
//Firebase
import { db } from '../firebase/firebaseConfig';
import * as fs from 'firebase/firestore';

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

function useTextForm(name) {
    const [value, setState] = useState("");

    const handleChange = e => {
        setState(e.target.value);
    };

    const inputProps = {
        name,
        type: "text",
        onChange: handleChange
    };

    return [value, inputProps];
}

var sessionId;

async function controlCreateSession(sessionName, sessionPrivacy, userJoinedId) {
    const docRef = fs.doc(fs.collection(db, "fkSessions"));
    sessionId = docRef.id;
    await fs.setDoc(
        docRef, 
        {
            id: docRef.id,
            name: sessionName,
            privacy: sessionPrivacy,
            isSessionStarted: false,
            isSessionEnded: false,
            time: 0,
            startedTime: 1000000000000000000
        }
    );
    
    const sessionDocRef = fs.doc(db, "fkSessions", sessionId);
    const userJoinedDocRef = fs.doc(fs.collection(sessionDocRef, "usersJoined"), userJoinedId);
    await fs.setDoc(
        userJoinedDocRef,
        {
            id: userJoinedId,
            isAdmin: true,
            hasCompleted: false,
            latestTimeJoined: 0,
            isAchievementCreated: false,
        }
    );
}

function Home() {
    const { data: session, status } = useSession();

    const router = useRouter();
    function controlNavigateSession() {
        router.push("/sessions/" + sessionId);   
    }
    function controlNavigateInNavBar(where) {
        router.push("/" + where);   
    }
    var rank = "1";
    const [showPopUpCreateSession, setShowPopUpCreateSession] = useState(false);
    const [showCircularButtonSession, setShowCircularButtonSession] = useState(false);
    const [privacyValue, privacyInputProps] = useRadioButtons();
    const [sessionNameValue, sessionInputProps] = useTextForm();
    const [isBeingProcessed, setIsBeingProcessed] = useState(false);

    const [todayTime, setTodayTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);

    const sessionsList = [];

    function convertSeconds(sec) {
        var hrs = Math.floor(sec / 3600);
        var min = Math.floor((sec - (hrs * 3600)) / 60);
        var seconds = sec - (hrs * 3600) - (min * 60);
        seconds = Math.round(seconds * 100) / 100
       
        var result = (hrs < 10 ? "0" + hrs : hrs);
        result += " : " + (min < 10 ? "0" + min : min);
        result += " : " + (seconds < 10 ? "0" + seconds : seconds);
        return result;
    }

    function countTodayTime(_sessionsList) {
        var _todayTime = 0;
        const toDay = new Date();
        for (var i = 0; i < _sessionsList.length; i++) {
            const dateCompleted = new Date(_sessionsList[i].timeCompleted);
            if (toDay.toDateString() === dateCompleted.toDateString()) {
                _todayTime = _todayTime + _sessionsList[i].time;
            }
        }
        return _todayTime;
    }

    //Get data
    useEffect(() => {
        if (session?.user.id != null) {
            const userDocRef = fs.doc(fs.collection(db, "fkUsers"), session?.user.id);
            const achievementColRef = fs.collection(userDocRef, "achievements");
            const q = fs.query(achievementColRef);
            const querySnapshot = fs.getDocs(q);
            querySnapshot.then((query) => {
                query.forEach((doc) => {
                    sessionsList.push(doc.data());
                });
                //setTodayTime(sessionsList.map(i => i.time).reduce((a, b)=> a + b));
                setTodayTime(countTodayTime(sessionsList));
                setTotalSessions(sessionsList.length);
            });
        }
    });

    if (status === "loading") {
        return(null)
    }

    if (status === "authenticated") {
        return(
            <Sidebar>
                <Header headerText={'Welcome back, ' + removeVI(session?.user.name, { ignoreCase: false, replaceSpecialCharacters: false }) + '! 👋'}>
                </Header>

                <div className='relative mt-[30px] mx-auto w-[90%] h-[410px]'>
                    <div className='absolute w-full h-[96px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                        <div className='relative mt-[20px] container mx-auto w-[92%] h-[56px]'>
                            <div className='absolute w-[30%] h-full hover:cursor-pointer' onClick={() => controlNavigateInNavBar("timemanagement")}>
                                <div className='absolute w-[56px] h-full rounded-full bg-[#FFE8DB]'>
                                    <div className='absolute scale-[60%] container my-[0px] mx-auto' style={{color: '#FF965A'}}>
                                        <ClockIcon></ClockIcon>
                                    </div>

                                    <div className='absolute left-[71px] font-poppins text-sm text-grey select-none'>
                                        Today
                                    </div>

                                    <div className='absolute left-[71px] bottom-0 font-poppins text-xl text-black font-semibold whitespace-nowrap truncate select-none ...'>
                                        {convertSeconds(todayTime)}
                                    </div>                
                                </div>  
                            </div>

                            <div className='absolute ml-[35%] w-[30%] h-full hover:cursor-pointer'>
                                <div className='absolute w-[56px] h-full rounded-full bg-[#CAF1FF]'>
                                    <div className='absolute scale-[60%] container my-[0px] mx-auto' style={{color: '#0F5FC2'}}>
                                        <CheckCircleIcon></CheckCircleIcon>
                                    </div>

                                    <div className='absolute left-[71px] font-poppins text-sm text-grey whitespace-nowrap select-none'>
                                        Total Sessions
                                    </div>

                                    <div className='absolute left-[71px] bottom-0 font-poppins text-xl text-black font-semibold whitespace-nowrap truncate select-none ...'>
                                        {totalSessions}
                                    </div>                  
                                </div>             
                            </div>

                            <div className='absolute right-0 w-[30%] h-full hover:cursor-pointer' onClick={() => controlNavigateInNavBar("leaderboard")}>
                                <div className='absolute w-[56px] h-full rounded-full bg-[#D3FFE7]'>
                                    <div className='absolute scale-[60%] container my-[0px] mx-auto' style={{color: '#00AC4F'}}>
                                        <StarIcon></StarIcon>
                                    </div>

                                    <div className='absolute left-[71px] font-poppins text-sm text-grey whitespace-nowrap select-none'>
                                        My Rank
                                    </div>

                                    <div className='absolute left-[71px] bottom-0 font-poppins text-xl text-black font-semibold whitespace-nowrap truncate select-none ...'>
                                        {rank + "st in 36"}
                                    </div>                                  
                                </div>  
                            </div>                                  
                        </div>
                    </div>

                    <div className='absolute mt-[111px] w-full h-[142px]'>
                        <div className='absolute w-[49%] h-full grid items-center justify-center drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light'
                        onClick={() => setShowPopUpCreateSession(true)}
                        >
                            <div className='relative w-[300px] h-[120px]'>
                                <div className='absolute container grid place-items-center font-poppins font-semibold text-black text-[12pt] whitespace-nowrap truncate select-none ...'>
                                    Create a new Session
                                </div>

                                <div className='absolute mt-[25px] container grid place-items-center font-poppins text-grey text-[8pt] whitespace-nowrap truncate select-none ...'>
                                    Be a powerful Session Administrator
                                </div>

                                <div className='absolute ml-[110px] bottom-0 h-[65px] w-[65px]' style={{color: theme.extend.colors.purple}}>
                                    <PlusCircleIcon></PlusCircleIcon>
                                </div>
                            </div>
                        </div>

                        <div className='absolute right-0 w-[49%] h-full grid items-center justify-center drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light'>
                            <div className='relative w-[300px] h-[120px]'>
                                <div className='absolute container grid place-items-center font-poppins font-semibold text-black text-[12pt] whitespace-nowrap truncate select-none ...'>
                                    Join an existing Session
                                </div>

                                <div className='absolute mt-[25px] container grid place-items-center font-poppins text-grey text-[8pt] whitespace-nowrap truncate select-none ...'>
                                    Stay "fokused" with other members
                                </div>

                                <div className='absolute ml-[110px] bottom-0 h-[65px] w-[65px]' style={{color: theme.extend.colors.purple}}>
                                    <ViewGridAddIcon></ViewGridAddIcon>
                                </div>
                            </div>
                        </div>                     
                    </div>

                    <div className='absolute mt-[268px] w-full h-[142px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                        <div className='relative mt-[7px] w-[90%] h-[128px] container mx-auto'>
                            <div className='absolute h-full w-[49%]'>
                                <Logo className='w-full h-full scale-[60%]'></Logo>
                            </div>

                            <div className='absolute right-0 h-full grid items-center justify-center w-[49%] font-poppins text-purple text-sm select-none'>
                                "Create a Session or join one with your friends via the specific ID, you’ll never find avoiding your mobile phones while dealing with tasks a big trouble. Stay 'FOKUSED' now or never."
                            </div>         
                        </div>
                    </div>
                     
                    {
                    showPopUpCreateSession ==  true ?
                    <div className='flex items-center justify-center h-full w-full'>
                        <div className='w-[60%] h-[90%] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                            <div className='h-[15%] w-full flex items-center justify-center font-poppins text-xm font-medium select-none'>
                                Create Session

                                <div className='absolute right-[15px] h-[40px] w-[40px] hover:cursor-pointer' style={{color: theme.extend.colors.purple}} onMouseOver={({target})=>target.style.color=theme.extend.colors.purple_2} onMouseOut={({target})=>target.style.color=theme.extend.colors.purple}
                                onClick={() => setShowPopUpCreateSession(false)}
                                >
                                    <XCircleIcon></XCircleIcon>
                                </div>                                  
                            </div>

                            <div className='relative h-[70%] w-[90%] mx-auto flex items-center justify-center'>
                                <div className='h-[70%] w-[90%]'>
                                    <div className='h-[50%] w-full flex items-center justify-center'>
                                        <form className='w-full h-full'>
                                            <label for="session_name" class="block mb-2 text-sm font-poppins font-medium select-none">{"Name (required)"}</label>
                                            {
                                                isBeingProcessed == false ?
                                                <input type="text" name="session" id="session_name" class="bg-white border-[2px] focus:outline-purple text-sm font-poppins rounded-lg block w-full p-2.5" value={sessionNameValue} {...sessionInputProps}/>
                                                :
                                                <input type="text" name="session" id="session_name" class="bg-slate-100 border-[2px] text-sm text-grey font-poppins rounded-lg block w-full p-2.5" value={sessionNameValue} disabled/>
                                            }
                                        </form>                                        
                                    </div>

                                    <div className='h-[50%] w-full'>
                                        <form className='w-full h-full'>
                                            <label for="privacy" class="block mb-2 text-sm font-poppins font-medium select-none">{"Privacy (required)"}</label>

                                            <div class="flex items-center justify-center">
                                                <div class="form-check form-check-inline">
                                                    {
                                                        isBeingProcessed == false ?
                                                        <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-purple checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="privacyRadioOptions" id="privacy1" value="private" checked={privacyValue === "private"} {...privacyInputProps}/>
                                                        :
                                                        <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-400 bg-white checked:bg-purple_grey checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="privacyRadioOptions" id="privacy1" value="private" checked={privacyValue === "private"} disabled/>
                                                    }
                                                    <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio10">Private</label>
                                                </div>
                                                <div class="ml-[130px] form-check form-check-inline">
                                                    {
                                                        isBeingProcessed == false ?
                                                        <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-300 bg-white checked:bg-purple checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="privacyRadioOptions" id="privacy2" value="public" checked={privacyValue === "public"} {...privacyInputProps}/>
                                                        :
                                                        <input class="form-check-input appearance-none rounded-full h-5 w-5 border-2 border-gray-400 bg-white checked:bg-purple_grey checked:border-gray-300 checked:border-[3px] transition mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="privacyRadioOptions" id="privacy2" value="public" checked={privacyValue === "public"} disabled/>
                                                    } 
                                                    <label class="form-check-label inline-block text-sm font-poppins select-none" for="inlineRadio20">Public</label>
                                                </div>
                                            </div>                                            
                                        </form>                                        
                                    </div>
                                </div>
                            </div>

                            <div className='relative h-[15%] w-[90%] mx-auto flex items-center justify-center'>
                            {
                                (privacyValue === null || sessionNameValue === "") ?
                                <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-purple opacity-30 rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                                    Create
                                </button>
                                :
                                (
                                    showCircularButtonSession == false ?
                                    <button type="button" class="absolute flex items-center justify-center right-0 w-[25%] h-[60%] bg-purple rounded-[15px] font-poppins text-sm text-white font-medium hover:bg-purple_2 hover:cursor-pointer select-none"
                                    onClick={() => {
                                            setShowCircularButtonSession(true); 
                                            setIsBeingProcessed(true); 
                                            controlCreateSession(sessionNameValue, privacyValue, session?.user.id);
                                            console.log(sessionId);
                                            setTimeout(controlNavigateSession, 5000);
                                        }
                                    }>
                                        Create
                                    </button>
                                    :
                                    <button type="button" class="absolute flex items-center justify-center right-0 w-[30%] h-[60%] bg-purple_grey rounded-[15px] font-poppins text-sm text-white font-medium select-none" disabled>
                                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
    
                                        Creating...
                                    </button>                                    
                                )
                            }
                            </div>                            
                        </div>
                    </div>
                    : null
                    }  
                </div>    
            </Sidebar>                 
        )
    }

    return (
        <div>
            <Head>
                <title>Fokus | Sign In</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SignIn></SignIn>
        </div>
    );
}

export default Home
