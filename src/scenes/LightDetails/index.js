import React, { useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles, hasWebFocusableUI } from '../config';

const ScreenLightDetails = () => {
    const [message, setMessage] = useState('Details');
    
    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{message}</Text>
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenLightDetails) : ScreenLightDetails);
