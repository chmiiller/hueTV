import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles } from '../../config';
import {
    askUsername,
    getBridgeIpAddress,
    setUsername,
    testInternetConnection,
} from '../../hueapi';
import Step from './components/Step';

const screenTitle = 'Settings';
const numberOfSteps = 3;

const AUTH_SUBTITLE = 'Please press the button on your Hue Bridge (physical device) to finish the setup';

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

    const testInternet = async() => {
        const internetTestResult = await testInternetConnection();
        if (!internetTestResult.error) {
            setCurrentStep(1);
            setInternetSetup({
                ...internetSetup,
                subtitle: '',
                completed: true,
            });
            setSearchSetup({ ...searchSetup, available: true });
            setFocus('step_search');
        } else {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> internetTestResult: ${JSON.stringify(internetTestResult,null,'    ')} `);
            setInternetSetup({
                ...internetSetup,
                subtitle: 'Not connected, please try again',
            });
        }
    };
    
    const getBridgeAddress = async() => {
        const bridgeAddressResult = await getBridgeIpAddress();
        if (!bridgeAddressResult.error) {
            setCurrentStep(2);
            setSearchSetup({
                ...searchSetup,
                subtitle: '',
                completed: true,
            });
            setAuthSetup({ ...authSetup, available: true });
            setFocus('step_authenticate');
        } else {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> bridgeAddressResult: ${JSON.stringify(bridgeAddressResult,null,'    ')} `);
            setSearchSetup({
                ...searchSetup,
                subtitle: 'Bridge not found, please try again',
            });
        }
    };
    
    const getUsername = async() => {
        const userRes = await askUsername();
        if (userRes.error && userRes.error.type && userRes.error.type === 101) {
            setAuthSetup({ ...authSetup, subtitle: `${AUTH_SUBTITLE} - 10s` });
            let count = 20;
            const countInterval = setInterval(async () => {
                // ask for username
                const intervalRes = await askUsername();
                if (intervalRes && intervalRes.success && intervalRes.success.username) {
                    // On success, clear interval
                    setCurrentStep(3);
                    setAuthSetup({
                        ...authSetup,
                        subtitle: ``,
                        completed: true,
                    });
                    const username = await setUsername(intervalRes.success.username);
                    clearInterval(countInterval);
                    return;
                } else {
                    // on error, keep trying for 20 seconds
                    setAuthSetup({ ...authSetup, subtitle: `${AUTH_SUBTITLE} - ${count}s` });
                    if (count === 0) {
                        clearInterval(countInterval);
                        setAuthSetup({ ...authSetup, subtitle: '', available: true });
                        setFocus('step_authenticate');
                    }
                    count--;
                }
            }, 1100);
        }
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
                        setInternetSetup({ ...internetSetup, subtitle: 'testing...' });
                        testInternet();
                    }}
                />
                <Step
                    focusKey={'step_search'}
                    title={'Looking for Hue Bridge'}
                    status={searchSetup}
                    onEnter={() => {
                        setSearchSetup({ ...searchSetup, subtitle: 'searching...' });
                        getBridgeAddress();
                    }}
                />
                <Step
                    focusKey={'step_authenticate'}
                    title={'Connecting to the Hue Bridge'}
                    status={authSetup}
                    onEnter={() => {
                        setAuthSetup({ ...authSetup, subtitle: 'connecting...' });
                        getUsername();
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