import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Data for sidebar in array form containing objects
export const SidebarData = [
    {
        name: "Dashboard",
        icon: <SpaceDashboardIcon />,
        link: "/Dashboard"
    },
    {
        name: "Add Users",
        icon: <PersonAddIcon />,
        link: "/AddUsers"
    },
    {
        name: "Settings",
        icon: <SettingsIcon />,
        link: "/Settings"
    },
    {
        name: "Sign out",
        icon: <LogoutIcon />,
        link: "/SignIn"
    },
]

