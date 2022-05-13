import React from 'react'
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Logo from '../assets/svgs/fokus_logo.svg';
import { removeVI, DefaultOption } from 'jsrmvi';
//Icons
import {
    ClockIcon,
    CheckCircleIcon,
    StarIcon,
    PlusCircleIcon,
    ViewGridAddIcon
  } from '@heroicons/react/solid';
  import { theme } from '../tailwind.config';
//Authentication
import { signIn, useSession } from 'next-auth/react';

function Home() {
    const { data: session, status } = useSession();
    var hours = "7.5";
    var sessions = "234";
    var rank = "1";

    if (status === "loading") {
        return(
            <div></div>
        )
    }

    if (status === "authenticated") {
        return(
            <Sidebar>
                <Header headerText={'Welcome back, ' + removeVI(session.user.name, { ignoreCase: false, replaceSpecialCharacters: false }) + '! 👋'}>
                </Header>

                <div className='relative mt-[30px] mx-auto w-[90%] h-[510px]'>
                    <div className='absolute w-full h-[96px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                        <div className='relative mt-[20px] container mx-auto w-[92%] h-[56px]'>
                            <div className='absolute w-[30%] h-full hover:cursor-pointer'>
                                <div className='absolute w-[56px] h-full rounded-full bg-[#FFE8DB]'>
                                    <div className='absolute scale-[60%] container my-[0px] mx-auto' style={{color: '#FF965A'}}>
                                    <ClockIcon></ClockIcon>
                                    </div>

                                    <div className='absolute left-[71px] font-poppins text-sm text-grey select-none'>
                                    Today
                                    </div>

                                    <div className='absolute left-[71px] bottom-0 font-poppins text-xl text-black font-semibold whitespace-nowrap truncate select-none ...'>
                                    {hours + " hours"}
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
                                    {sessions}
                                    </div>                  
                                </div>             
                            </div>

                            <div className='absolute right-0 w-[30%] h-full hover:cursor-pointer'>
                            <div className='absolute w-[56px] h-full rounded-full bg-[#D3FFE7]'>
                                <div className='absolute scale-[60%] container my-[0px] mx-auto' style={{color: '#00AC4F'}}>
                                <StarIcon></StarIcon>
                                </div>

                                <div className='absolute left-[71px] font-poppins text-sm text-grey whitespace-nowrap select-none'>
                                My Rank
                                </div>

                                <div className='absolute left-[71px] bottom-0 font-poppins text-xl text-black font-semibold whitespace-nowrap truncate select-none ...'>
                                {rank + "st among 36"}
                                </div>                                  
                            </div>  
                            </div>                                  
                        </div>
                    </div>

                    <div className='absolute mt-[111px] w-full h-[192px]'>
                        <div className='absolute w-[49%] h-full drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light'>
                            <div className='relative mt-[30px] container mx-auto w-[300px] h-[132px]'>
                                <div className='absolute container grid place-items-center font-poppins font-semibold text-black text-[12pt] whitespace-nowrap truncate select-none ...'>
                                    Create a new Session
                                </div>

                                <div className='absolute mt-[25px] container grid place-items-center font-poppins text-grey text-[8pt] whitespace-nowrap truncate select-none ...'>
                                    Be a powerful Session Administrator
                                </div>

                                <div className='absolute ml-[110px] bottom-0 h-[80px] w-[80px]' style={{color: theme.extend.colors.purple}}>
                                    <PlusCircleIcon></PlusCircleIcon>
                                </div>
                            </div>
                        </div>

                        <div className='absolute right-0 w-[49%] h-full drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light'>
                            <div className='relative mt-[30px] container mx-auto w-[300px] h-[132px]'>
                                <div className='absolute container grid place-items-center font-poppins font-semibold text-black text-[12pt] whitespace-nowrap truncate select-none ...'>
                                Join an existing Session
                                </div>

                                <div className='absolute mt-[25px] container grid place-items-center font-poppins text-grey text-[8pt] whitespace-nowrap truncate select-none ...'>
                                Stay "fokused" with other members
                                </div>

                                <div className='absolute ml-[110px] bottom-0 h-[80px] w-[80px]' style={{color: theme.extend.colors.purple}}>
                                <ViewGridAddIcon></ViewGridAddIcon>
                                </div>
                            </div>
                        </div>                     
                    </div>

                    <div className='absolute mt-[318px] w-full h-[192px] drop-shadow-[0_10px_60px_rgba(226,236,249,1)] bg-white rounded-[15px]'>
                        <div className='relative mt-[32px] w-[90%] h-[128px] container mx-auto'>
                            <div className='absolute h-full w-[49%]'>
                            <Logo className='w-full h-full scale-[60%]'></Logo>
                            </div>

                            <div className='absolute right-0 h-full w-[49%] font-poppins text-purple text-sm select-none'>
                            "Create a Session or join one with your friends via the specific code, you’ll never find avoiding your mobile phones while dealing with tasks a big trouble. Stay 'FOKUSED' now or never."
                            </div>

                            <div className='absolute right-0 bottom-0 h-[15%] w-[49%] font-poppins text-grey text-sm text-right select-none'>
                            The Fokus Team
                            </div>            
                        </div>
                    </div>        
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

            <button onClick={() => signIn()}>
                Sign In
            </button>
        </div>
    )
}

export default Home
