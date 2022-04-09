import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export type SideMenuObject = {
    id: string,
    path: string,
    focusName?: string,
    title: string,
    icon?: JSX.Element,
    selectedIcon?: JSX.Element,
};

type SideMenuConfigObject = {
    items: Array<SideMenuObject>
};

const iconStyle = { fontSize: 32 };
export const sideMenuConfig: SideMenuConfigObject = {
    items: [
        {
            id: 'menu_item_root',
            path: '/home',
            focusName: 'home_screen',
            title: 'Home',
            icon: <HomeOutlinedIcon style={iconStyle} />,
            selectedIcon: <HomeIcon style={iconStyle} />,
        },
        {
            id: 'menu_item_lights',
            path: '/lights',
            focusName: 'lights_screen',
            title: 'Lights',
            icon: <LightbulbOutlinedIcon style={iconStyle} />,
            selectedIcon: <LightbulbIcon style={iconStyle} />,
        },
        {
            id: 'menu_item_settings',
            path: '/settings',
            focusName: 'settings_screen',
            title: 'Settings',
            icon: <SettingsOutlinedIcon style={iconStyle} />,
            selectedIcon: <SettingsIcon style={iconStyle} />,
        },
        {
            id: 'menu_item_about',
            path: '/about',
            focusName: 'about_screen',
            title: 'About',
            icon: <PersonOutlineIcon style={iconStyle} />,
            selectedIcon: <PersonIcon style={iconStyle} />,
        },
        {
            id: 'menu_item_exit',
            path: '/exit',
            title: 'Exit',
            icon: <LogoutOutlinedIcon style={iconStyle} />,
            selectedIcon: <LogoutIcon style={iconStyle} />,
        },
    ]
};
