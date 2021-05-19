import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, navigate } from '@reach/router';
import { getScaledValue } from 'renative';

import ScreenRooms from '../scenes/Rooms';
import ScreenLights from '../scenes/Lights';
import ScreenSettings from '../scenes/Settings';
import ScreenModal from '../components/screenModal';
import ScreenLightDetails from '../scenes/LightDetails';
import ScreenExitModal from '../scenes/ExitModal';
import Menu from '../components/menu';
import KeyDebug from '../components/KeyDebug';
import { debugging, themeStyles, ROUTES } from '../config';

const App = () => {
    useEffect(() => {
        // Required for tizen
        if (window.focus) window.focus();
    }, []);

    const [debug, setDebug] = useState('DEBUG:');
    const myDebug = useRef();

    const addLog = str => {
        if (str === 'clear') {
            myDebug.current = '';
            setDebug('');
            return;
        }
        const newDebug = myDebug.current + `\n${str}`;
        myDebug.current = newDebug;
        setDebug(myDebug.current);
    }

    return (
        <View style={themeStyles.app}>
            <Menu focusKey="menu" navigate={navigate} />
            <View style={themeStyles.appContainer}>
                <Router>
                    <ScreenRooms path={ROUTES.ROOMS} debug={addLog} />
                    <ScreenRooms path={ROUTES.HOME} debug={addLog} />
                    <ScreenLights path={ROUTES.LIGHTS} debug={addLog} />
                    <ScreenSettings path={ROUTES.SETTINGS} debug={addLog} />
                    <ScreenModal path={ROUTES.MODAL} debug={addLog} />
                    <ScreenLightDetails path={ROUTES.DETAILS} debug={addLog} />
                    <ScreenExitModal path={ROUTES.EXIT} debug={addLog} />
                </Router>
            </View>
            { debugging && (
                <View style={styles.debugContainer}>
                    <Text style={styles.sectionSubtitle}>{debug}</Text>
                </View>
            )}
            { debugging && <KeyDebug /> }
        </View>
    );
};

const styles = StyleSheet.create({
    sectionSubtitle: {
        fontSize: getScaledValue(16),
        color: 'green',
    },
    debugContainer: {
        backgroundColor: 'black',
        position: 'absolute',
        right: getScaledValue(12),
        top: getScaledValue(24),
        width: '30%',
        height: '100%',
        opacity: 0.8,
    },
});

export default App;
