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

const SideMenuItems = (): JSX.Element => {
    const history = useHistory();
    const onEnter = (path: string) => {
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
