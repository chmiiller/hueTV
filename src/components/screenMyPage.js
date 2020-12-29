import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Api, Button, useNavigate, useOpenURL } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { testInternetConnection, getLights } from '../hueapi';
import Theme, { themeStyles, hasWebFocusableUI } from '../config';
import List from '../scenes/list';

const FocusableView = withFocusable()(View);

const ScreenMyPage = () => {
    const [message, setMessage] = useState('Lights 💡');
    useEffect(() => {
        console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Api: ${JSON.stringify(Api,null,'    ')} `);
    }, []);

    const testInternet = async() => {
        const response = await testInternetConnection();
        if (response && response.results && response.results[0]) {
            const item = response.results[0];
            setMessage(item.bundleId);
        }
    };

    const fetchLights = async() => {
        const lights = await getLights();
        console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> lights: ${JSON.stringify(lights,null,'    ')} `);
    };

    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{message}</Text>
                    <List />
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenMyPage) : ScreenMyPage);
