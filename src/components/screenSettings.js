import React, { useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles, hasWebFocusableUI } from '../config';

const ScreenSettings = () => {
    const [message, setMessage] = useState('Settings ⚙️');
    
    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{message}</Text>
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenSettings) : ScreenSettings);
