import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export type SideMenuObject = {
    id: string,
    path: string,
    title: string,
    icon: JSX.Element,
    selectedIcon: JSX.Element,
};

type SideMenuConfigObject = {
    items: Array<SideMenuObject>
};
export const sideMenuConfig: SideMenuConfigObject = {
    items: [
        {
            id: 'menu_item_root',
            path: '/home',
            title: 'Home',
            icon: <HomeOutlinedIcon />,
            selectedIcon: <HomeIcon />,
        },
        {
            id: 'menu_item_lights',
            path: '/contact',
            title: 'Lights',
            icon: <LightbulbOutlinedIcon />,
            selectedIcon: <LightbulbIcon />,
        },
        {
            id: 'menu_item_settings',
            path: '/contact2',
            title: 'Settings',
            icon: <SettingsOutlinedIcon />,
            selectedIcon: <SettingsIcon />,
        },
        {
            id: 'menu_item_exit',
            path: '/exit',
            title: 'Exit',
            icon: <LogoutOutlinedIcon />,
            selectedIcon: <LogoutIcon />,
        },
    ]
};
