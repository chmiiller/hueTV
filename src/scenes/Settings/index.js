import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import AsyncStorage from '@react-native-community/async-storage';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles } from '../../config';
import { getBridgeIpAddress } from '../../hueapi';
// import FocusableButtonLabel from '../../components/FocusableButtonLabel';

const screenTitle = 'Settings';

const keyBridgeIp = `@bridge_ip`;

const Settings = (props) => {
    const [debugging, setDebugging] = useState('');

    useEffect(() => {
        readIpAddress();
    }, []);

    const readIpAddress = async() => {
        let finalDebug = debugging;
        const ipAddress = await AsyncStorage.getItem(keyBridgeIp);
        if (!ipAddress) {
            finalDebug = finalDebug + '\nNo IP address, fetching new one';
            const ipAddressFromAPI = await getBridgeIpAddress();
            finalDebug = finalDebug + `\nNew IP address from API - ${ipAddressFromAPI}`;
            finalDebug = finalDebug + `\nStoring new IP`;
            await AsyncStorage.setItem(keyBridgeIp, ipAddressFromAPI);
            finalDebug = finalDebug + `\nNew IP Stored`;
        } else {
            finalDebug = finalDebug + `\nFound IP address stored - ${ipAddress}`;
        }
        setDebugging(finalDebug);
    };

    return (
        <View style={themeStyles.screen}>
            <View style={styles.titleContainer}>
                <Text style={themeStyles.textH2}>{screenTitle}</Text>
                <Text style={themeStyles.textH4}>{`Debug: ${debugging}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: getScaledValue(16),
        marginBottom: getScaledValue(4)
    },
    buttonContainer: {
        marginTop: getScaledValue(24),
        justifyContent: 'space-around'
    },
});

export default withFocusable()(Settings);