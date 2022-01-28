import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import { useNavigate, useLocation } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import FocusableMenuItem from './FocusableMenuItem';
import FocusableButton from '../FocusableButton';
import { sideMenuConfig, type SideMenuObject } from './SideMenuConfig';

type SideMenuItemsProps = {
    toggleMenu: (menuOpen: boolean) => void,
};
const SideMenuItems = ({ toggleMenu }: SideMenuItemsProps): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [menuOpened, setMenuOpened] = React.useState(true);
    
    const focusedItem = React.useRef('');
    // Useful for displaying/hiding "Exit App" modal by pressing the back button from the menu
    const dialogDisplayed = React.useRef(false);

    const onKey = (event: KeyboardEvent) => {
        if (event.keyCode === 10009 || event.keyCode === 8 || event.keyCode === 27) {
            if (focusedItem.current !== '') {
                setDialogVisible(true);
                dialogDisplayed.current = true;
            } else if (dialogDisplayed.current) {
                setDialogVisible(false);
                dialogDisplayed.current = false;
            }
        }
    };

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('tizenhwkey', onKey); // No event type for Tizen events =/
        window.addEventListener('keydown', onKey);
    }, []);
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
                                    setDialogVisible(true);
                                    dialogDisplayed.current = true;
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
            <Dialog
                open={dialogVisible}
                fullScreen
                onClose={() => {
                    setDialogVisible(false);
                    dialogDisplayed.current = false;
                }} // Esc key callback
            >
                <DialogTitle id="simple-dialog-title">{'Do you want to exit HueTV?'}</DialogTitle>
                <DialogContent>
                    <FocusableButton focusKey={'bt_modal_1'} title={'Exit'} onEnterPress={exitApp}/>
                    <FocusableButton focusKey={'bt_modal_2'} title={'Cancel'} onEnterPress={() => {
                        setDialogVisible(false);
                        dialogDisplayed.current = false;
                    }}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

const FocusableSideMenu = withFocusable()(SideMenuItems);
export default FocusableSideMenu;