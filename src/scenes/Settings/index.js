import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getScaledValue, useNavigate } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles, ROUTES } from '../../config';
import { askUsername, getBridgeIpAddress } from '../../api/hueapi';
import { getBridgeIp, getBridgeUsername, getSetupDone } from '../../api/storage';

import Step from './components/Step';
import { primaryFont } from '../../constants/text';
import { white } from '../../constants/colors';

const TOTAL_STEPS = 2;
const TOTAL_AUTH_TRIES = 20;
const SCREEN_TITLE = 'Settings';
const SECTION1_TITLE = 'Initial Setup';
const STEPS_OF = 'of';
const STEPS_COMPLETED = 'completed';

const STEP1_TITLE = 'Looking for Hue Bridge';
const STEP1_SUBTITLE = 'searching...';
const STEP1_ERROR = 'Bridge not found, please try again';

const STEP2_TITLE = 'Connecting to the Hue Bridge';
const STEP2_INIT_SUBTITLE = 'Note that you will need physical access to the Hue Bridge device';
const AUTH_SUBTITLE = 'Please press the button on your Hue Bridge (physical device) to finish the setup';

const Settings = (props) => {
    const { debug, setFocus } = props;
    const navigate = useNavigate(props);
    const [isTesting, setIsTesting] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [searchSetup, setSearchSetup] = useState({
        subtitle: '',
        available: false,
        completed: false,
    });
    const [authSetup, setAuthSetup] = useState({
        subtitle: STEP2_INIT_SUBTITLE,
        available: false,
        completed: false,
    });

    useEffect(() => {
        debug('clear');
        autoTestConfiguration();
    }, []);

    const autoTestConfiguration = initial => {
        setIsTesting(true);
        debug('Gonna auto test');
        const setupDoneBefore = getSetupDone();
        debug(` setupDoneBefore: ${setupDoneBefore} `);
        const checkTestIp = getBridgeIp();
        debug(` checkTestIp: ${JSON.stringify(checkTestIp,null,'    ')} `);
        const checkTestUser = getBridgeUsername();
        debug(` checkTestUser: ${JSON.stringify(checkTestUser,null,'    ')} `);
        // If user set it up once, runs the automatic test
        if (setupDoneBefore) {
            const testIp = getBridgeIp();
            const testUser = getBridgeUsername();
            if (testIp.error || testUser.error) {
                debug(` >>>>> Settings error!\n\n\ntestIp: ${JSON.stringify(testIp)} \ntestUser: ${JSON.stringify(testUser)} `);
                setIsTesting(false);
                setFocus('step_search');
            } else {
                console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> YOU'RE READY!`);
                debug(` testIp: ${JSON.stringify(testIp,null,'    ')} `);
                debug(` testUser: ${JSON.stringify(testUser,null,'    ')} `);
                debug(' IT WORKS!!! ');
                
                if (initial) {
                    setTimeout(() => {
                        navigate(`/${ROUTES.ROOMS}`);
                        setIsTesting(false);
                    }, 1000);
                    setIsTesting(true);
                } else {
                    completeSteps();
                    setIsTesting(false);
                }
            }
        } else {
            resetSteps();
            setIsTesting(false);
        }
    };

    // STEP 1 - Get Hue Bridge IP Address
    const stepGetBridgeAddress = async() => {
        const bridgeAddressResult = await getBridgeIpAddress();
        if (!bridgeAddressResult.error) {
            setCurrentStep(1);
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
                subtitle: STEP1_ERROR,
            });
            setFocus('step_search');
        }
    };
    
    //STEP 2 - Authenticate with Hue Bridge by pressing its button
    const stepGetUsername = async() => {
        const tizenId = window.tizen ? window.tizen.systeminfo.getCapability('http://tizen.org/system/tizenid') : 'huetv';
        debug(`tizenId: ${tizenId}`);
        const userRes = await askUsername(tizenId, debug);
        if (userRes.error && userRes.error.type && userRes.error.type === 101) {
            setAuthSetup({ ...authSetup, subtitle: `${AUTH_SUBTITLE} - ${TOTAL_AUTH_TRIES}s` });
            let count = TOTAL_AUTH_TRIES;
            const countInterval = setInterval(async () => {
                // ask for username
                const intervalRes = await askUsername(tizenId, debug);
                if (intervalRes && intervalRes.success && intervalRes.success.username) {
                    // On success, clear interval
                    setCurrentStep(2);
                    setAuthSetup({ ...authSetup, subtitle: ``, completed: true });
                    clearInterval(countInterval);
                    setIsTesting(true);
                    setTimeout(() => {
                        autoTestConfiguration(true);
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
        setSearchSetup({ subtitle: '', available: true, completed: false });
        setAuthSetup({ subtitle: STEP2_INIT_SUBTITLE, available: false, completed: false });
        setFocus('step_search');
    };
    
    const completeSteps = () => {
        setCurrentStep(2);
        setSearchSetup({ subtitle: '', available: true, completed: true });
        setAuthSetup({ subtitle: STEP2_INIT_SUBTITLE, available: false, completed: true });
        setFocus('step_search');
    };

    const Steps = () => (
        <View>
            <Step
                focusKey={'step_search'}
                title={STEP1_TITLE}
                status={searchSetup}
                onEnter={() => {
                    setSearchSetup({ ...searchSetup, subtitle: STEP1_SUBTITLE });
                    stepGetBridgeAddress();
                }}
            />
            <Step
                focusKey={'step_authenticate'}
                title={STEP2_TITLE}
                status={authSetup}
                onEnter={() => {
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
            <View style={styles.containerBottom}>
                <Text style={styles.versionTitle}>{`version 202105`}</Text>
            </View>
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
    versionTitle: {
        color: white,
        fontSize: getScaledValue(8),
        textAlign: 'center',
        opacity: 0.8,
    },
    containerBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: getScaledValue(24),
        paddingRight: getScaledValue(12),
    },
});

export default withFocusable()(Settings);