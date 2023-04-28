import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Data for sidebar in array form containing objects
export const SidebarData = [
    {
        icon: <SpaceDashboardIcon />,
        link: "/main",
        handler: () => { console.log("Clicked Logout") }
    },
    {
        icon: <CalendarMonthIcon />,
        link: "/main",
        handler: () => { console.log("Clicked Logout") }
    },
    {
        icon: <SettingsIcon />,
        link: "/main",
        handler: () => { console.log("Clicked Logout") }
    },
    {
        icon: <LogoutIcon />,
        link: "/",
        handler: () => { console.log("Clicked Logout") }
    },
]

