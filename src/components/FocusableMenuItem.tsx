import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

type MenuItemProps = {
    path: string,
    selected: boolean,
    icon: React.ReactNode,
    selectedIcon: React.ReactNode,
    title: string,
    focused: boolean,
    setFocus: () => void,
};

const MenuItem = ({
    path,
    selected,
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
        <div style={{paddingLeft: 16, paddingRight: 16, marginBottom: 16}}>
            <ListItemButton selected={focused || selected} component={RouterLink} to={path}>
                <ListItemIcon>
                    {focused || selected ? selectedIcon : icon}
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItemButton>
        </div>
    );
};

const FocusableMenuItem = withFocusable()(MenuItem);
export default FocusableMenuItem;
