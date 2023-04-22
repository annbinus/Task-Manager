import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Data for sidebar in array form containing objects
export const SidebarData = [
    {
        icon: <SpaceDashboardIcon />,
        link: "/Dashboard"
    },
    {
        icon: <CalendarMonthIcon />,
        link: "/Calender"
    },
    {
        icon: <SettingsIcon />,
        link: "/Settings"
    },
    {
        icon: <LogoutIcon />,
        link: "/SignOut"
    },
]

