import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { usePop } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { themeStyles, hasWebFocusableUI } from '../../config';
import { black } from '../../constants/colors';
import FocusableButton from '../../components/FocusableButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const ExitModal = (props) => {
    const pop = usePop(props);
    const { setFocus } = props;
    const [isClosing, setIsClosing] = useState(false);

    if (hasWebFocusableUI) {
        useEffect(() => {
            setFocus('exit_confirm');
            setTimeout(() => {
                window.addEventListener('keydown', onKeyDownExit);
            }, 100);

            return () => {
                window.removeEventListener('keydown', onKeyDownExit);
            };
        }, []);
    }
    
    const onKeyDownExit = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                pop();
                break;
        }
    }

    const exitApp = () => {
        window.tizen.application.getCurrentApplication().exit();
    };

    return (
        <View style={[themeStyles.screenModal, {backgroundColor: black}]}>
            <View style={styles.container}>
                <Text style={[themeStyles.textH2, {marginBottom: 24}]}>{'Exit Application?'}</Text>
                { isClosing ? (
                    <View>
                        <ActivityIndicator size="large" color="#96969b" />
                    </View>
                ) : (
                    <View>
                        <FocusableButton
                            focusKey={'exit_confirm'}
                            title={'Exit'}
                            onEnter={exitApp}
                        />
                        <FocusableButton
                            focusKey={'exit_cancel'}
                            title={'Cancel'}
                            onEnter={() => {
                                pop();
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ExitModal) : ExitModal);
