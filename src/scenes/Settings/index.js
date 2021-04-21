import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import AsyncStorage from '@react-native-community/async-storage';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles } from '../../config';
import { getBridgeIpAddress } from '../../hueapi';
import Step from './components/Step';

const screenTitle = 'Settings';

const keyBridgeIp = `@bridge_ip`;
const numberOfSteps = 3;

const Settings = (props) => {
    const { setFocus } = props;
    const [debugging, setDebugging] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [internetSetup, setInternetSetup] = useState({
        subtitle: '',
        available: true,
        completed: false,
    });
    const [searchSetup, setSearchSetup] = useState({
        subtitle: '',
        available: false,
        completed: false,
    });
    const [authSetup, setAuthSetup] = useState({
        subtitle: '',
        available: false,
        completed: false,
    });

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
            </View>
            <View style={styles.content}>
                <Text style={themeStyles.textH2}>{'Initial setup'}</Text>
                <Text style={themeStyles.textH3}>{`${currentStep} of ${numberOfSteps}`}</Text>
                <Step
                    focusKey={'step_internet'}
                    title={'Internet Connection'}
                    status={internetSetup}
                    onEnter={() => {
                        setInternetSetup({ ...internetSetup, subtitle: 'connecting...' });
                        setTimeout(() => {
                            setCurrentStep(1);
                            setInternetSetup({
                                ...internetSetup,
                                subtitle: '',
                                completed: true,
                            });
                            setSearchSetup({ ...searchSetup, available: true });
                            setFocus('step_search');
                        }, 2000);
                    }}
                />
                <Step
                    focusKey={'step_search'}
                    title={'Looking for Hue Bridge'}
                    status={searchSetup}
                    onEnter={() => {
                        setSearchSetup({ ...searchSetup, subtitle: 'searching...' });
                        setTimeout(() => {
                            setCurrentStep(2);
                            setSearchSetup({
                                ...searchSetup,
                                subtitle: '',
                                completed: true,
                            });
                            setAuthSetup({ ...authSetup, available: true });
                            setFocus('step_authenticate');
                        }, 2000);
                    }}
                />
                <Step
                    focusKey={'step_authenticate'}
                    title={'Press the Hue Bridge button'}
                    status={authSetup}
                    onEnter={() => {
                        setAuthSetup({ ...authSetup, subtitle: 'searching...' });
                        setTimeout(() => {
                            setCurrentStep(3);
                            setAuthSetup({
                                ...authSetup,
                                subtitle: '',
                                completed: true,
                            });
                        }, 2000);
                    }}
                />
            </View>
            <Text style={themeStyles.textH4}>{`Debug: ${debugging}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: getScaledValue(16),
        marginBottom: getScaledValue(4)
    },
    content: {
        width: '60%',
        padding: getScaledValue(24),
        alignItems: 'flex-start',
    },
});

export default withFocusable()(Settings);