import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Data for sidebar in array form containing objects
export const SidebarData = [
    {
        icon: <SpaceDashboardIcon />,
        link: "/Dashboard"
    },
    {
        icon: <PersonAddIcon />,
        link: "/AddUsers"
    },
    {
        icon: <SettingsIcon />,
        link: "/Settings"
    },
    {
        icon: <LogoutIcon />,
        link: "/SignIn"
    },
]

