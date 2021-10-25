import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

type MenuItemProps = {
    icon: React.ReactNode,
    path: string,
    title: string,
    focused: boolean,
    setFocus: () => void,
};

const MenuItem = ({
    icon,
    path,
    title,
    focused,
    setFocus,
}: MenuItemProps): JSX.Element => {
    React.useEffect(() => {
        setFocus();
    }, []);

    return (
        <ListItemButton selected={focused} component={RouterLink} to={path}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItemButton>
    );
};

const FocusableMenuItem = withFocusable()(MenuItem);
export default FocusableMenuItem;
