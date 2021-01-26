import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Router, navigate } from '@reach/router';

import ScreenGroups from '../scenes/Groups';
import ScreenLights from '../scenes/Lights';
import ScreenSettings from '../components/screenSettings';
import ScreenModal from '../components/screenModal';
import ScreenLightDetails from '../scenes/LightDetails';
import ScreenExitModal from '../scenes/ExitModal';
import Menu from '../components/menu';
import KeyDebug from '../components/KeyDebug';
import { themeStyles, ROUTES } from '../config';

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
                    <ScreenGroups path={ROUTES.GROUPS} />
                    <ScreenLights path={ROUTES.HOME} />
                    <ScreenSettings path={ROUTES.SETTINGS} />
                    <ScreenModal path={ROUTES.MODAL} />
                    <ScreenLightDetails path={ROUTES.DETAILS} />
                    <ScreenExitModal path={ROUTES.EXIT} />
                </Router>
            </View>
            <KeyDebug />
        </View>
    );
};

export default App;
