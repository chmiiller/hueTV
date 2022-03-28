import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';

import SideMenuItems from './SideMenuItems';

const drawerWidth = 525;
const closedDrawerWidth = drawerWidth / 4;

const openedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: closedDrawerWidth,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideMenu = (): JSX.Element => {
    const [open, setOpen] = React.useState(true);
    const toggleMenu = (menuOpen: boolean) => setOpen(menuOpen);

    return (
        <Drawer open={open} variant="permanent">
            <div style={{height: 100}}></div>
            <SideMenuItems toggleMenu={toggleMenu}/>
        </Drawer>
    );
};

export default SideMenu;
