import React from 'react';

import List from '@mui/material/List';
import { useNavigate, useLocation } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import FocusableMenuItem from './FocusableMenuItem';
import { sideMenuConfig, type SideMenuObject } from './SideMenuConfig';

type SideMenuItemsProps = {
    toggleMenu: (menuOpen: boolean) => void,
};
const SideMenuItems = ({ toggleMenu }: SideMenuItemsProps): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [menuOpened, setMenuOpened] = React.useState(true);
    
    const focusedItem = React.useRef('');
    
    const exitApp = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.tizen.application.getCurrentApplication().exit();
    };

    const selectItem = (focusKey: string) => {
        focusedItem.current = focusKey;
        toggleMenu(true);
        setMenuOpened(true);
    };
    
    const deselectItem = () => {
        focusedItem.current = '';
        setTimeout(() => {
            if (focusedItem.current === '') {
                toggleMenu(false);
                setMenuOpened(false);
            }
        }, 100);
    };

    return (
        <>
            <List>
                {sideMenuConfig.items.map((sideMenuObject: SideMenuObject) => {
                    return (
                        <FocusableMenuItem
                            key={sideMenuObject.id}
                            path={sideMenuObject.path}
                            focusKey={sideMenuObject.id} // withFocusable prop
                            selected={location.pathname == sideMenuObject.path && menuOpened === false}
                            icon={sideMenuObject.icon}
                            selectedIcon={sideMenuObject.selectedIcon}
                            title={sideMenuObject.title}
                            onEnterPress={() => { // withFocusable prop
                                if (sideMenuObject.id === 'menu_item_exit') {
                                    exitApp();
                                    return;
                                }
                                navigate(sideMenuObject.path);
                            }}
                            onBecameFocused={() => selectItem(sideMenuObject.id)} // withFocusable prop
                            onBecameBlurred={() => deselectItem()} // withFocusable prop
                        />
                    );
                })}
            </List>
        </>
    );
};

const FocusableSideMenu = withFocusable()(SideMenuItems);
export default FocusableSideMenu;