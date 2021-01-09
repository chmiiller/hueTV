import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Api, useNavigate } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { testInternetConnection, getLights } from '../hueapi';
import Theme, { themeStyles, hasWebFocusableUI } from '../config';
import List from '../scenes/list';

const screenTitle = 'All your lights';
const ScreenHome = (props) => {
    const navigate = useNavigate(props);
    
    useEffect(() => {
        console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Api: ${JSON.stringify(Api,null,'    ')} `);
    
    }, []);

    const testInternet = async() => {
        const response = await testInternetConnection();
        if (response && response.results && response.results[0]) {
            const item = response.results[0];
        }
    };

    const fetchLights = async() => {
        const lights = await getLights();
        console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> lights: ${JSON.stringify(lights,null,'    ')} `);
    };

    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{screenTitle}</Text>
                <List />
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenHome) : ScreenHome);
