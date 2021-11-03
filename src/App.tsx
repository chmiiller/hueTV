import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Contact from './scenes/Contact';
import Contact2 from './scenes/Contact2';
import SideMenu from './components/SideMenu';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#21bfc2b3',
            light: '#90DFE0',
            dark: '#105F61',
            contrastText: '#E5E7E8',
        },
        secondary: {
            main: '#d34c6b',
            light: '#e9a5b5',
            dark: '#692635',
            contrastText: '#E5E7E8',
        },
        background: {
            default: '#1c1e26',
            paper: '#222830',
        },
    },
});

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

type AppProps = {
    setFocus: () => void,
};

function App({ setFocus }: AppProps) {
    const classes = useStyles();
    const history = useHistory();

    const onKey = (event: KeyboardEvent) => {
        console.log(`key: ${event.keyCode}`);
        if (event.keyCode === 10009 || event.keyCode === 8 || event.keyCode === 27) {
            console.log('Bye Bye');
            if (modalVisible) {
                setModalVisible(false);
            } else {
                setModalVisible(true);
            }
            
        }
    };
    const [modalVisible, setModalVisible] = React.useState(false);
    React.useEffect(() => {
        setFocus();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('tizenhwkey', onKey); // No event type for Tizen events =/
        window.addEventListener('keydown', onKey);
        history.push("/home");
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu />
                <main className={classes.content}>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route exact path="/home" render={(props) => <Contact {...props} />} />
                        <Route exact path="/contact2" render={(props) => <Contact2 {...props} />} />
                    </Switch>
                </main>
            </div>
        </ThemeProvider>
    );
}

const FocusableApp = withFocusable()(App);
export default FocusableApp;
