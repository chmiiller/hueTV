import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import theme, { themeStyles } from '../../config';
import {
    askUsername,
    getBridgeIpAddress,
    setUsername,
    testInternetConnection,
} from '../../hueapi';
import Step from './components/Step';

const TOTAL_STEPS = 3;
const TOTAL_AUTH_TRIES = 20;
const SCREEN_TITLE = 'Settings';
const SECTION1_TITLE = 'Initial Setup';
const STEPS_OF = 'of';
const STEPS_COMPLETED = 'completed';
const AUTH_SUBTITLE = 'Please press the button on your Hue Bridge (physical device) to finish the setup';

const STEP1_TITLE = 'Internet Connection';
const STEP1_SUBTITLE = 'testing...';
const STEP1_ERROR = 'Not connected, please try again';

const STEP2_TITLE = 'Looking for Hue Bridge';
const STEP2_SUBTITLE = 'searching...';
const STEP2_ERROR = 'Bridge not found, please try again';

const STEP3_TITLE = 'Connecting to the Hue Bridge';
const STEP3_SUBTITLE = 'connecting...';

const Settings = (props) => {
    const { setFocus } = props;
    const [isTesting, setIsTesting] = useState(true);
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
        setTimeout(() => {
            setIsTesting(false);
        }, 3000);
    }, []);

    // STEP 1 - Check internet connection
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
                subtitle: STEP1_ERROR,
            });
        }
    };
    
    // STEP 2 - Get Hue Bridge IP Address
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
                subtitle: STEP2_ERROR,
            });
        }
    };
    
    //STEP 3 - Authenticate with Hue Bridge by pressing its button
    const getUsername = async() => {
        const userRes = await askUsername();
        if (userRes.error && userRes.error.type && userRes.error.type === 101) {
            setAuthSetup({ ...authSetup, subtitle: `${AUTH_SUBTITLE} - ${TOTAL_AUTH_TRIES}s` });
            let count = TOTAL_AUTH_TRIES;
            const countInterval = setInterval(async () => {
                // ask for username
                const intervalRes = await askUsername();
                if (intervalRes && intervalRes.success && intervalRes.success.username) {
                    // On success, clear interval
                    setCurrentStep(3);
                    setAuthSetup({ ...authSetup, subtitle: ``, completed: true });
                    const username = await setUsername(intervalRes.success.username);
                    console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> got username: ${username} `);
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

    const Steps = () => (
        <View>
            <Step
                focusKey={'step_internet'}
                title={STEP1_TITLE}
                status={internetSetup}
                onEnter={() => {
                    setInternetSetup({ ...internetSetup, subtitle: STEP1_SUBTITLE });
                    testInternet();
                }}
            />
            <Step
                focusKey={'step_search'}
                title={STEP2_TITLE}
                status={searchSetup}
                onEnter={() => {
                    setSearchSetup({ ...searchSetup, subtitle: STEP2_SUBTITLE });
                    getBridgeAddress();
                }}
            />
            <Step
                focusKey={'step_authenticate'}
                title={STEP3_TITLE}
                status={authSetup}
                onEnter={() => {
                    setAuthSetup({ ...authSetup, subtitle: STEP3_SUBTITLE });
                    getUsername();
                }}
            />
        </View>
    );

    const Loading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#96969b" />
            </View>
        );
    };
    return (
        <View style={themeStyles.screen}>
            <View style={styles.titleContainer}>
                <Text style={themeStyles.textH2}>{SCREEN_TITLE}</Text>
            </View>
            <View style={styles.content}>
                <Text style={themeStyles.textH2}>{SECTION1_TITLE}</Text>
                <Text style={styles.sectionSubtitle}>{`${currentStep} ${STEPS_OF} ${TOTAL_STEPS} ${STEPS_COMPLETED}`}</Text>
                {!isTesting && <Steps />}
            </View>
            {isTesting && <Loading />}
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
    loadingContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontFamily: theme.primaryFontFamily,
        fontSize: getScaledValue(15),
        marginHorizontal: getScaledValue(20),
        marginTop: getScaledValue(5),
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    sectionSubtitle: {
        fontFamily: theme.primaryFontFamily,
        fontSize: getScaledValue(12),
        marginHorizontal: getScaledValue(21),
        marginTop: getScaledValue(-6),
        opacity: 0.8,
        color: '#FFFFFF',
        textAlign: 'center'
    },
});

export default withFocusable()(Settings);