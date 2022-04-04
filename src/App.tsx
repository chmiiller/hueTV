import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import About from './scenes/About';
import RoomDetailsScreen from './scenes/RoomDetailsScreen';
import LightDetailsScreen from './scenes/LightDetailsScreen';
import Lights from './scenes/Lights';
import Settings from './scenes/Settings';
import Home from './scenes/Home';
import SideMenu from './components/SideMenu';

import { getSetupDone } from './api/storage';

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
    const navigate = useNavigate();

    React.useEffect(() => {
        setFocus();
        const setupState = getSetupDone();
        if (setupState.data) {
            navigate("/home", { replace: true });
        } else {
            navigate("/settings", { replace: true });
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu />
                <main className={classes.content}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/lights" element={<Lights />} />
                        <Route path="/light" element={<LightDetailsScreen />} />
                        <Route path="/room" element={<RoomDetailsScreen />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
    );
}

const FocusableApp = withFocusable()(App);
export default FocusableApp;
