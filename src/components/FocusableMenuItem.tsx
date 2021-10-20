import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ListItem from '@mui/material/ListItem';
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
        <ListItem button component={RouterLink} to={path}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title} secondary={focused ? 'Focused' : 'Away'} />
        </ListItem>
    );
};

const FocusableMenuItem = withFocusable()(MenuItem);
export default FocusableMenuItem;
