import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import FocusableMenuItem from './FocusableMenuItem';
import FocusableButton from './FocusableButton';

const SideMenuItems = (): JSX.Element => {
    const history = useHistory();
    const onEnter = (path: string) => {
        console.log(`>>>>>>>>>>>>> ASDIOJAOISDJOAISJDAOSIDJ`);
        history.push(path);
    };
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const exitApp = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.tizen.application.getCurrentApplication().exit();
    };
    return (
        <>
            <List>
                <FocusableMenuItem
                    icon={<DashboardIcon />}
                    path="/"
                    focusKey="Contact"
                    title="Contact"
                    onEnterPress={() => {
                        onEnter('/');
                    }}
                />
                <FocusableMenuItem
                    icon={<ShoppingCartIcon />}
                    path="/contact2"
                    focusKey="Contact 2"
                    title="Contact 2"
                    onEnterPress={() => {
                        onEnter('/contact2');
                    }}
                />
                <ListItem button component={RouterLink} to="/contact">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItem>
                <FocusableMenuItem
                    icon={<ExitToAppIcon />}
                    path="/modal"
                    focusKey="bt_exit_app"
                    title="Exit"
                    onEnterPress={() => {
                        setDialogVisible(true);
                    }}
                />
            </List>
            <Dialog
                open={dialogVisible}
                fullScreen
                onClose={() => {
                    setDialogVisible(false);
                }} // Esc key callback
            >
                <DialogTitle id="simple-dialog-title">{'Do you want to exit HueTV?'}</DialogTitle>
                <DialogContent>
                    <FocusableButton focusKey={'bt_modal_1'} title={'Exit'} onEnterPress={exitApp}/>
                    <FocusableButton focusKey={'bt_modal_2'} title={'Cancel'} onEnterPress={() => {
                        setDialogVisible(false);
                    }}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SideMenuItems;
