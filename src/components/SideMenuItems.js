import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import FocusableMenuItem from './FocusableMenuItem';

const SideMenuItems = () => {
    const history = useHistory();
    const onEnter = (path) => {
        console.log(`>>>>>>>>>>>>> ASDIOJAOISDJOAISJDAOSIDJ`);
        history.push(path);
    };

    return (
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
        </List>
    );
};

export default SideMenuItems;
