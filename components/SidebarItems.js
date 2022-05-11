import React from 'react'
import {
    HomeIcon,
    ChartBarIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    CogIcon,
  } from '@heroicons/react/solid';

function SidebarItems() {
    return [
        {
            href: '/navigation/Home',
            url: '/',
            title: 
                <div className="flex-row container w-[150px]">
                    Home
                </div>,            
            icon:   
                <div className="flex-row container w-[24px]">
                    <HomeIcon></HomeIcon>
                </div>,      
        },
        {
            href: '/navigation/TimeManagement',
            url: '/time',
            title:
                <div className="flex-row container w-[150px]">
                    Time Management
                </div>,            
            icon:
                <div className="flex-row container w-[24px]">
                    <ChartBarIcon></ChartBarIcon>
                </div>,                  
        },
        {
            href: '/navigation/Store',
            url: '/store',
            title: 
                <div className="flex-row container w-[150px]">
                    Fokus Store
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </div>,                  
        },
        {
            href: '/navigation/Leaderboard',
            url: '/leaderboard',
            title:
                <div className="flex-row container w-[150px]">
                    Leaderboard
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <UserGroupIcon></UserGroupIcon>
                </div>,               
        },
        {
            href: '/navigation/Settings',
            url: '/settings',
            title: 
                <div className="flex-row container w-[150px]">
                    Settings
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <CogIcon></CogIcon>
                </div>,                   
        },
    ];  
}

export default SidebarItems
  