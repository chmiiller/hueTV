import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Api, Button, useNavigate, useOpenURL } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { testInternetConnection, getLights } from '../api/hueapi';
import Theme, { themeStyles, hasWebFocusableUI } from '../config';
import List from '../scenes/list';

const FocusableView = withFocusable()(View);

const Navigation = () => {
    const [message, setMessage] = useState('Lights 💡');

    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{"Carlos"}</Text>
                    
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Navigation) : Navigation);
