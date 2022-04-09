import React from 'react';

import List from '@mui/material/List';
import { useNavigate, useLocation } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import FocusableMenuItem from './FocusableMenuItem';
import { sideMenuConfig, type SideMenuObject } from './SideMenuConfig';

type SideMenuItemsProps = {
    toggleMenu: (menuOpen: boolean) => void,
    setFocus: (item?: string) => void,
};

const SideMenuItems = ({ toggleMenu, setFocus }: SideMenuItemsProps): JSX.Element => {
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            marginBottom: 12
        }}>
            <div style={{ }}>
                <List sx={{
                    '&& .Mui-selected, && .Mui-selected:hover': {
                        backgroundColor: 'white',
                        '&, & .MuiListItemIcon-root': {
                            color: 'black',
                        },
                    },
                }}>
                    {sideMenuConfig.items.map((sideMenuObject: SideMenuObject) => {
                        if (sideMenuObject.id === 'menu_item_exit' || sideMenuObject.id === 'menu_item_about') {
                            return;
                        }
                        return (
                            <FocusableMenuItem
                                key={sideMenuObject.id}
                                path={sideMenuObject.path}
                                focusKey={sideMenuObject.id} // withFocusable prop
                                current={location.pathname == sideMenuObject.path && menuOpened === false} // if it's the current selected menu item
                                menuOpened={menuOpened}
                                icon={sideMenuObject.icon}
                                selectedIcon={sideMenuObject.selectedIcon}
                                title={sideMenuObject.title}
                                onEnterPress={() => { // withFocusable prop
                                    if (sideMenuObject.id === 'menu_item_exit') {
                                        exitApp();
                                        return;
                                    }
                                    if (sideMenuObject.id === 'menu_item_settings') {
                                        navigate(sideMenuObject.path);
                                    }
                                    deselectItem();
                                    setFocus(sideMenuObject.focusName || '');
                                }}
                                onBecameFocused={() => { // withFocusable prop
                                    selectItem(sideMenuObject.id);
                                    if (sideMenuObject.id !== 'menu_item_settings') {
                                        navigate(sideMenuObject.path);
                                    }
                                }}
                                onBecameBlurred={() => deselectItem()} // withFocusable prop
                            />
                        );
                    })}
                </List>
            </div>
            <div>
                {/* Second list of buttons */}
                <List sx={{
                    '&& .Mui-selected, && .Mui-selected:hover': {
                        backgroundColor: 'white',
                        '&, & .MuiListItemIcon-root': {
                            color: 'black',
                        },
                    },
                }}>
                    {sideMenuConfig.items.map((sideMenuObject: SideMenuObject) => {
                        if (sideMenuObject.id !== 'menu_item_exit' && sideMenuObject.id !== 'menu_item_about') {
                            return;
                        }
                        return (
                            <FocusableMenuItem
                                key={sideMenuObject.id}
                                path={sideMenuObject.path}
                                focusKey={sideMenuObject.id} // withFocusable prop
                                current={location.pathname == sideMenuObject.path && menuOpened === false} // if it's the current selected menu item
                                menuOpened={menuOpened}
                                icon={sideMenuObject.icon}
                                selectedIcon={sideMenuObject.selectedIcon}
                                title={sideMenuObject.title}
                                onEnterPress={() => { // withFocusable prop
                                    if (sideMenuObject.id === 'menu_item_exit') {
                                        exitApp();
                                        return;
                                    }
                                    deselectItem();
                                    setFocus(sideMenuObject.focusName || '');
                                    navigate(sideMenuObject.path);
                                }}
                                onBecameFocused={() => selectItem(sideMenuObject.id)} // withFocusable prop
                                onBecameBlurred={() => deselectItem()} // withFocusable prop
                            />
                        );
                    })}
                </List>
            </div>
        </div>
    );
};

const FocusableSideMenu = withFocusable()(SideMenuItems);
export default FocusableSideMenu;