import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Contact from './scenes/Contact';
import Contact2 from './scenes/Contact2';
import Modal from './scenes/Modal';
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
    const onKey = (event: any) => {
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
        window.addEventListener('tizenhwkey', onKey);
        window.addEventListener('keydown', onKey);
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu />
                {modalVisible && <Modal />}
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
