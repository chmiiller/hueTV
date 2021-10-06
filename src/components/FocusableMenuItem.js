import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

const MenuItem = ({
    icon, path, title, focused, setFocus,
}) => {
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
