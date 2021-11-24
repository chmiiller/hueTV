import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    React.useEffect(() => {
        setFocus();
        navigate("/home", { replace: true });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu />
                <main className={classes.content}>
                    <Routes>
                        <Route path="/" element={<Contact />} />
                        <Route path="/home" element={<Contact />} />
                        <Route path="/contact2" element={<Contact2 />} />
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
    );
}

const FocusableApp = withFocusable()(App);
export default FocusableApp;