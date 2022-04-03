import React from 'react'
import {
    HomeIcon,
    ChartBarIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    CogIcon,
    ChevronRightIcon 
  } from '@heroicons/react/solid';

function SidebarItems() {
    return [
        {
            href: '/',
            destination: '/',
            title: 
                <div className="flex-row container w-[150px]">
                    Home
                </div>,            
            icon: 
                <div className="flex-row container w-[24px]">
                    <HomeIcon></HomeIcon>
                </div>,
            arrow:
                <div className="flex-row-reverse container w-[18px]">
                    <ChevronRightIcon></ChevronRightIcon>
                </div>            
        },
        {
            href: '/TimeManagement',
            destination: '/time',
            title:
                <div className="flex-row container w-[150px]">
                    Time Management
                </div>,            
            icon:
                <div className="flex-row container w-[24px]">
                    <ChartBarIcon></ChartBarIcon>
                </div>,
            arrow:
                <div className="flex-row-reverse container w-[18px]">
                    <ChevronRightIcon></ChevronRightIcon>
                </div>                    
        },
        {
            href: '/Store',
            destination: '/store',
            title: 
                <div className="flex-row container w-[150px]">
                    Fokus Store
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </div>,
            arrow:
                <div className="flex-row-reverse container w-[18px]">
                    <ChevronRightIcon></ChevronRightIcon>
                </div>                    
        },
        {
            href: '/Leaderboard',
            destination: '/leaderboard',
            title:
                <div className="flex-row container w-[150px]">
                    Leaderboard
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <UserGroupIcon></UserGroupIcon>
                </div>,
            arrow:
                <div className="flex-row-reverse container w-[18px]">
                    <ChevronRightIcon></ChevronRightIcon>
                </div>                    
        },
        {
            href: '/Settings',
            destination: '/settings',
            title: 
                <div className="flex-row container w-[150px]">
                    Settings
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <CogIcon></CogIcon>
                </div>,
            arrow:
                <div className="flex-row-reverse container w-[18px]">
                    <ChevronRightIcon></ChevronRightIcon>
                </div>                    
        },
    ];  
}

export default SidebarItems
  