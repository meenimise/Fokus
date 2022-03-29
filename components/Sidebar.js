import React from 'react'
import Logo from '../assets/svgs/fokus_logo.svg'
import Link from 'next/link';
import {useRouter} from 'next/router';

function Sidebar({children}) {
  const router = useRouter();

  const sidebarItems = [
    {
      href: '/',
      destination: '/',
      title: 'Home',
    },
    {
      href: '/TimeManagement',
      destination: '/time',
      title: 'Time Management',
    },
    {
      href: '/Store',
      destination: '/store',
      title: 'Fokus Store',
    },
    {
      href: '/Leaderboard',
      destination: '/leaderboard',
      title: 'Leaderboard',
    },
    {
      href: '/Settings',
      destination: '/settings',
      title: 'Settings',
    },
  ];

  return (
    <div className='w-[306px] fixed h-screen bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>

      <div className="box-content pt-[41px]">
      </div>

      <div className="container mx-auto w-[120px] h-[32.5px]">
        <Logo></Logo>
      </div>

      <div className="box-content pt-[54.5px]">
      </div>

      <div className="flex flex-col">
        <aside>
          <nav>
            <ul>
              {sidebarItems.map(({href, destination, title}) => (
                <li className='ml-[28px] mr-[28px] mb-[40px]' key={title}>
                  <Link href={href} as={destination}>
                    <a
                      className={`flex w-[250px] h-[46px] p-[12px] bg-white rounded-[8px] font-poppins font-medium text-[14px] focus:text-white text-purple_grey  hover:bg-purple_light focus:bg-purple delay-80  cursor-pointer ${
                        router.asPath === destination && 'bg-purple text-white'
                      }`}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}
        </main>
      </div>

    </div>

  )
}

export default Sidebar