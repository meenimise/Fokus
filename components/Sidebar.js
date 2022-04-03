import React from 'react';
import Logo from '../assets/svgs/fokus_logo.svg';
import Link from 'next/link';
import {useRouter} from 'next/router';
import SidebarItems from './SidebarItems';

function Sidebar({children}) {
  const router = useRouter();
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
              {SidebarItems().map(({href, destination, title, icon, arrow}) => (
                <li className='ml-[28px] mr-[28px] mb-[40px]' key={title}>
                  <Link href={href} as={destination}>
                    <a
                      className={`flex w-[250px] h-[46px] p-[12px] bg-white rounded-[8px] font-poppins font-medium text-[15px] text-purple_grey  hover:bg-purple_light hover:text-purple_grey cursor-pointer ${
                        router.asPath === destination && 'bg-purple text-white'
                      }`}
                    >
                      {icon}
                        <div className="box-content pl-[14px]">
                        </div>
                      {title}
                        <div className="box-content pl-[27px]">
                        </div>
                      {arrow}                     
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