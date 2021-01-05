import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Router, navigate } from '@reach/router';

import ScreenHome from '../components/screenHome';
import ScreenSettings from '../components/screenSettings';
import ScreenModal from '../components/screenModal';
import ScreenLightDetails from '../scenes/LightDetails';
import Menu from '../components/menu';
import { themeStyles } from '../config';

const App = () => {
    useEffect(() => {
        // Required for tizen
        if (window.focus) window.focus();
    }, []);

    return (
        <View style={themeStyles.app}>
            <Menu focusKey="menu" navigate={navigate} />
            <View style={themeStyles.appContainer}>
                <Router>
                    <ScreenHome path="/" />
                    <ScreenSettings path="settings" />
                    <ScreenModal path="modal" />
                    <ScreenLightDetails path="details" />
                </Router>
            </View>
        </View>
    );
};

export default App;
