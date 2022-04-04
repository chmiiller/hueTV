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
    icon?: JSX.Element,
    selectedIcon?: JSX.Element,
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
            icon: <HomeOutlinedIcon style={{ fontSize: 30 }} />,
            selectedIcon: <HomeIcon style={{ fontSize: 30 }} />,
        },
        {
            id: 'menu_item_lights',
            path: '/lights',
            title: 'Lights',
            icon: <LightbulbOutlinedIcon style={{ fontSize: 30 }} />,
            selectedIcon: <LightbulbIcon style={{ fontSize: 30 }} />,
        },
        {
            id: 'menu_item_settings',
            path: '/settings',
            title: 'Settings',
            icon: <SettingsOutlinedIcon style={{ fontSize: 30 }} />,
            selectedIcon: <SettingsIcon style={{ fontSize: 30 }} />,
        },
        {
            id: 'menu_item_about',
            path: '/about',
            title: 'About',
        },
        {
            id: 'menu_item_exit',
            path: '/exit',
            title: 'Exit',
            icon: <LogoutOutlinedIcon style={{ fontSize: 30 }} />,
            selectedIcon: <LogoutIcon style={{ fontSize: 30 }} />,
        },
    ]
};
