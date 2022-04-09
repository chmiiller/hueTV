import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

type MenuItemProps = {
    path: string,
    selected?: boolean,
    current?: boolean,
    menuOpened: boolean,
    icon: React.ReactNode,
    selectedIcon: React.ReactNode,
    title: string,
    focused: boolean,
    setFocus: () => void,
};

const MenuItem = ({
    path,
    selected,
    current,
    menuOpened,
    icon,
    selectedIcon,
    title,
    focused,
    setFocus,
}: MenuItemProps): JSX.Element => {
    React.useEffect(() => {
        setFocus();
    }, []);

    return (
        <div style={{paddingLeft: 32, paddingRight: 32, marginBottom: 12}}>
            <ListItemButton
                selected={focused || selected}
                component={RouterLink}
                to={path}
                sx={{
                    height: 78,
                    borderRadius: 2,
                    transition: '0.35s',
                }}
            >
                <ListItemIcon sx={{ marginLeft: 0 }}>
                    {focused || current ? selectedIcon : icon}
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                        fontSize: 28,
                        marginLeft: 2,
                    }}
                    sx={{
                        opacity: menuOpened ? 1 : 0,
                        transform: menuOpened ? 'scale(1,1)' : 'scale(0,1)',
                        transformOrigin: 'left',
                        transition: '0.1s',
                    }}
                />
            </ListItemButton>
        </div>
    );
};

const FocusableMenuItem = withFocusable()(MenuItem);
export default FocusableMenuItem;
