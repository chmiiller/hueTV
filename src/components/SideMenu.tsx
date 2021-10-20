import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import SideMenuItems from './SideMenuItems';

const drawerWidth = 240;
const useStyles = makeStyles(() => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
}));

const SideMenu = (): JSX.Element => {
    const classes = useStyles();
    const [keyValue, setKeyValue] = React.useState('');
    React.useEffect(() => {
        window.addEventListener('keydown', (event) => {
            setKeyValue(`keydown: ${event.code}`);
        });
        window.addEventListener('tizenhwkey', (event: any) => {
            setKeyValue(`tizenhwkey: ${event.keyName}`);
        });
    }, []);
    return (
        <Drawer
            open
            variant="permanent"
            classes={{ paper: clsx(classes.drawerPaper) }}
        >
            <div className={classes.toolbarIcon} />
            <Divider />
            <SideMenuItems />
            <h4>{`${keyValue}`}</h4>
        </Drawer>
    );
};

export default SideMenu;
