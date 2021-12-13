import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import List from '@mui/material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import FocusableMenuItem from './FocusableMenuItem';
import FocusableButton from './FocusableButton';

type SideMenuItemsProps = {
    toggleMenu: (menuOpen: boolean) => void,
};
const SideMenuItems = ({ toggleMenu }: SideMenuItemsProps): JSX.Element => {
    const navigate = useNavigate();
    const onEnter = (path: string) => {
        navigate(path);
    };
    const [dialogVisible, setDialogVisible] = React.useState(false);
    
    // Useful for displaying/hiding "Exit App" modal by pressing the back button from the menu
    const focusedItem = React.useRef('');
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
    };
    
    const deselectItem = () => {
        focusedItem.current = '';
        setTimeout(() => {
            if (focusedItem.current === '') {
                toggleMenu(false);
            }
        }, 100);
    };

    return (
        <>
            <List>
                <FocusableMenuItem
                    icon={<DashboardIcon />}
                    path="/"
                    focusKey="Home"
                    title="Home"
                    onEnterPress={() => {
                        onEnter('/home');
                    }}
                    onBecameFocused={() => selectItem('Home')}
                    onBecameBlurred={() => deselectItem()}
                />
                <FocusableMenuItem
                    icon={<DashboardIcon />}
                    path="/"
                    focusKey="Contact"
                    title="Contact"
                    onEnterPress={() => {
                        onEnter('/contact');
                    }}
                    onBecameFocused={() => selectItem('Contact')}
                    onBecameBlurred={() => deselectItem()}
                />
                <FocusableMenuItem
                    icon={<ShoppingCartIcon />}
                    path="/contact2"
                    focusKey="Contact 2"
                    title="Contact 2"
                    onEnterPress={() => {
                        onEnter('/contact2');
                    }}
                    onBecameFocused={() => selectItem('Contact 2')}
                    onBecameBlurred={() => deselectItem()}
                />
                <FocusableMenuItem
                    icon={<ExitToAppIcon />}
                    path="/modal"
                    focusKey="bt_exit_app"
                    title="Exit"
                    onEnterPress={() => {
                        setDialogVisible(true);
                        dialogDisplayed.current = true;
                    }}
                    onBecameFocused={() => selectItem('bt_exit_app')}
                    onBecameBlurred={() => deselectItem()}
                />
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