import React from 'react'
import {
    HomeIcon,
    FireIcon,
    ChartPieIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    CogIcon,
  } from '@heroicons/react/solid';

function SidebarItems() {
    return [
        {
            href: '/',
            url: '/',
            title: 
                <div className="flex-row container w-[150px]">
                    {"Home"}
                </div>,            
            icon:   
                <div className="flex-row container w-[24px]">
                    <HomeIcon></HomeIcon>
                </div>,      
        },
        {
            href: '/sidebar_nav/Feed',
            url: '/feed',
            title:
                <div className="flex-row container w-[150px]">
                    {"My Feed"}
                </div>,            
            icon:
                <div className="flex-row container w-[24px]">
                    <FireIcon></FireIcon>
                </div>,                  
        },
        {
            href: '/sidebar_nav/TimeManagement',
            url: '/timemanagement',
            title:
                <div className="flex-row container w-[150px]">
                    {"Time Management"}
                </div>,            
            icon:
                <div className="flex-row container w-[24px]">
                    <ChartPieIcon></ChartPieIcon>
                </div>,                  
        },
        {
            href: '/sidebar_nav/Store',
            url: '/store',
            title: 
                <div className="flex-row container w-[150px]">
                    {"Fokus Store"}
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </div>,                  
        },
        {
            href: '/sidebar_nav/Leaderboard',
            url: '/leaderboard',
            title:
                <div className="flex-row container w-[150px]">
                    {"Leaderboard"}
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <UserGroupIcon></UserGroupIcon>
                </div>,               
        },
        {
            href: '/sidebar_nav/Settings',
            url: '/settings',
            title: 
                <div className="flex-row container w-[150px]">
                    {"Settings"}
                </div>,                
            icon:
                <div className="flex-row container w-[24px]">
                    <CogIcon></CogIcon>
                </div>,                   
        },
    ];  
}

export default SidebarItems
  