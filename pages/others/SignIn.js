import React from 'react'
import Logo from '../../assets/svgs/fokus_logo.svg';
//Providers icons
import Google from '../../assets/others/google.png';
import GitHub from '../../assets/others/github.png';
import Facebook from '../../assets/others/facebook.png';
//Authentication
import { signIn } from 'next-auth/react';

function SignIn() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className=' w-[70%] h-[80%]'>
            <div className='w-[50%] h-[20%] mx-auto'>
                <Logo className='w-full h-full'></Logo>
            </div>

            <div className='flex justify-center items-center w-full h-[40%] mx-auto font-poppins font-semibold text-purple text-xl select-none overflow-x-clip'>
                {"Be ready to explore the Fokus® World."}
            </div>

            <div className='w-[50%] h-[40%] mx-auto'>
                <div className='w-full h-[28%] grid place-items-center drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light' onClick={() => signIn('google')}>
                    <div className='absolute grid place-items-center h-full w-full'>
                        <img className='absolute left-[15px] scale-[60%] h-full' src={Google.src}>
                        </img>

                        <div className='absolute w-[37.5%] h-full grid place-items-center text-[12.5pt] font-poppins font-medium text-grey truncate ... select-none'>
                            {"Sign in with Google"}
                        </div>
                    </div>
                </div>

                <div className='w-full h-[8%]'>
                </div>

                <div className='w-full h-[28%] grid place-items-center drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light' onClick={() => signIn('github')}>
                    <div className='absolute grid place-items-center h-full w-full'>
                            <img className='absolute left-[15px] h-full scale-[90%]' src={GitHub.src}>
                            </img>

                            <div className='absolute w-[37.5%] h-full grid place-items-center text-[12.5pt] font-poppins font-medium text-grey truncate ... select-none'>
                                {"Sign in with GitHub"}
                            </div>
                    </div>
                </div>

                <div className='w-full h-[8%]'>
                </div>

                <div className='w-full h-[28%] grid place-items-center drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-purple_light' onClick={() => signIn('facebook')}>
                    <div className='absolute grid place-items-center h-full w-full'>
                        <img className='absolute left-[15px] h-full scale-[60%]' src={Facebook.src}>
                        </img>

                        <div className='absolute w-[43%] h-full grid place-items-center text-[12pt] font-poppins font-medium text-grey truncate ... select-none'>
                            {"Sign in with Facebook"}
                        </div>
                    </div>
                </div>                                             
            </div>
        </div>
    </div>
  )
}

export default SignIn