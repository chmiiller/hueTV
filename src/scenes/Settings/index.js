import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import theme, { themeStyles } from '../../config';
import {
    askUsername,
    getBridgeIpAddress,
    testInternetConnection,
} from '../../api/hueapi';
import {
    getBridgeIp,
    setUsername,
    getUsername,
    getSetupDone,
    setSetupDone,
} from '../../api/storage';
import Step from './components/Step';
import { primaryFont } from '../../constants/text';

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
    const { debug, setFocus } = props;
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
        autoTestConfiguration();
    }, []);

    const autoTestConfiguration = async () => {
        setIsTesting(true);
        debug('Gonna auto test');
        const setupDoneBefore = await getSetupDone();
        debug(` setupDoneBefore: ${JSON.stringify(setupDoneBefore,null,'    ')} `);
        // If user set it up once, runs the automatic test
        if (setupDoneBefore) {
            const testConn = await testInternetConnection();
            const testIp = await getBridgeIp();
            debug(` testIp: ${JSON.stringify(testIp,null,'    ')} `);
            const testUser = await getUsername();
            debug(` testUser: ${JSON.stringify(testUser,null,'    ')} `);
            
            if (testConn.error || testIp.error || testUser.error) {
                // console.error(` >>>>> Settings error!\n\ntestConn: ${JSON.stringify(testConn)} \ntestIp: ${JSON.stringify(testIp)} \ntestUser: ${JSON.stringify(testUser)} `);
                if (testConn.error) {
                    debug(`  testConn.error: ${JSON.stringify(testConn.error,null,'    ')} `);
                } else {
                    debug(` >>>>> Settings error!\n\n\ntestIp: ${JSON.stringify(testIp)} \ntestUser: ${JSON.stringify(testUser)} `);
                }
                setIsTesting(false);
                setFocus('step_internet');
            } else {
                console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> YOU'RE READY!`);
                debug(` testIp: ${JSON.stringify(testIp,null,'    ')} `);
                debug(` testUser: ${JSON.stringify(testUser,null,'    ')} `);
                debug(' IT WORKS!!! ');
                setIsTesting(false);
                completeSteps();
            }
        } else {
            resetSteps();
            setIsTesting(false);
        }
    };

    // STEP 1 - Check internet connection
    const stepTestInternet = async() => {
        const internetTestResult = await testInternetConnection();
        if (!internetTestResult.error) {
            setCurrentStep(1);
            setInternetSetup({
                ...internetSetup,
                subtitle: '',
                completed: true,
            });
            setSearchSetup({ ...searchSetup, completed: false, available: true });
            setFocus('step_search');
        } else {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> internetTestResult: ${JSON.stringify(internetTestResult,null,'    ')} `);
            setInternetSetup({
                ...internetSetup,
                subtitle: STEP1_ERROR,
            });
            setFocus('step_internet');
        }
    };
    
    // STEP 2 - Get Hue Bridge IP Address
    const stepGetBridgeAddress = async() => {
        const bridgeAddressResult = await getBridgeIpAddress();
        if (!bridgeAddressResult.error) {
            setCurrentStep(2);
            setSearchSetup({
                ...searchSetup,
                subtitle: '',
                completed: true,
            });
            setAuthSetup({ ...authSetup, completed: false, available: true });
            setFocus('step_authenticate');
        } else {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> bridgeAddressResult: ${JSON.stringify(bridgeAddressResult,null,'    ')} `);
            setSearchSetup({
                ...searchSetup,
                subtitle: STEP2_ERROR,
            });
            setFocus('step_search');
        }
    };
    
    //STEP 3 - Authenticate with Hue Bridge by pressing its button
    const stepGetUsername = async() => {
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
                    // console.log(` >>> got username: ${username} `);
                    debug(` >>> got username: ${username} `);
                    clearInterval(countInterval);
                    setIsTesting(true);
                    setTimeout(async () => {
                        debug(' Gonna run auto test again');
                        debug('Forcing save/read');
                        await getSetupDone();
                        const testIp = await getBridgeIp();
                        const testUser = await getUsername();
                        debug(`saving forced testUser: ${testUser} `);
                        await setUsername(testUser);
                        debug(`saving forced setup as done`);
                        await setSetupDone();
                        setIsTesting(false);
                        completeSteps();
                    }, 2000);
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

    const resetSteps = () => {
        setCurrentStep(0);
        const resetStep = { subtitle: '', available: false, completed: false }; 
        setInternetSetup({ ...resetStep, available: true });
        setSearchSetup(resetStep);
        setAuthSetup(resetStep);
        setFocus('step_internet');
    };
    
    const completeSteps = () => {
        setCurrentStep(3);
        const completedStep = { subtitle: '', available: false, completed: true };
        setInternetSetup({ ...completedStep, available: true });
        setSearchSetup(completedStep);
        setAuthSetup(completedStep);
        setFocus('menu_rooms');
    };

    const Steps = () => (
        <View>
            <Step
                focusKey={'step_internet'}
                title={STEP1_TITLE}
                status={internetSetup}
                onEnter={() => {
                    resetSteps();
                    setInternetSetup({ subtitle: STEP1_SUBTITLE, completed: false });
                    setTimeout(() => {
                        stepTestInternet();
                    }, 500);
                }}
            />
            <Step
                focusKey={'step_search'}
                title={STEP2_TITLE}
                status={searchSetup}
                onEnter={() => {
                    setSearchSetup({ ...searchSetup, subtitle: STEP2_SUBTITLE });
                    stepGetBridgeAddress();
                }}
            />
            <Step
                focusKey={'step_authenticate'}
                title={STEP3_TITLE}
                status={authSetup}
                onEnter={() => {
                    setAuthSetup({ ...authSetup, subtitle: STEP3_SUBTITLE });
                    stepGetUsername();
                }}
            />
        </View>
    );

    const Loading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#96969b" />
        </View>
    );

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
        fontFamily: primaryFont,
        fontSize: getScaledValue(15),
        marginHorizontal: getScaledValue(20),
        marginTop: getScaledValue(5),
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    sectionSubtitle: {
        fontFamily: primaryFont,
        fontSize: getScaledValue(12),
        marginHorizontal: getScaledValue(21),
        marginTop: getScaledValue(-6),
        opacity: 0.8,
        color: '#FFFFFF',
        textAlign: 'center'
    },
});

export default withFocusable()(Settings);