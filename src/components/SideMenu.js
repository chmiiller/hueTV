import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import SideMenuItems from './SideMenuItems';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

const SideMenu = () => {
    const classes = useStyles();
    return (
        <Drawer
            open
            variant="permanent"
            classes={{ paper: clsx(classes.drawerPaper) }}
        >
            <div className={classes.toolbarIcon} />
            <Divider />
            <SideMenuItems />
        </Drawer>
    );
};

export default SideMenu;
