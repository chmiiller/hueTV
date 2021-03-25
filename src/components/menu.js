/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { getScaledValue, useNavigate, StyleSheet } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';

import Theme, { hasWebFocusableUI, ROUTES } from '../config';
import { black } from '../constants/colors';
import FocusableButtonWithIcon from '../components/FocusableButtonWithIcon'; 
import FocusableButtonLabel from '../components/FocusableButtonLabel'; 

const btRoomsLabel = 'Rooms';
const btLightsLabel = 'Lights';
const btSettingsLabel = 'Settings';
const btAboutLabel = 'About';
const btExitLabel = 'Exit Application';

if (hasWebFocusableUI) {
    initNavigation({
        debug: false,
        visualDebug: false,
        nativeMode: false
    });
}

const styles = StyleSheet.create({
    container: {
        width: Theme.menuWidth,
        height: Theme.menuHeight,
        backgroundColor: black,
        alignItems: 'flex-start',
        borderBottomWidth: 0,
        flexDirection: 'column'
    },
    containerTop: {
        flex: 1,
        marginTop: getScaledValue(48),
        marginLeft: getScaledValue(36),
        width: Theme.menuWidth,
    },
    containerBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: getScaledValue(24),
        paddingRight: getScaledValue(12),
        width: Theme.menuWidth,
    },
    aboutContainer: {
        bottom: 8,
    },
});

const Menu = (props) => {
    const { setFocus } = props;
    const navigate = useNavigate(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            setTimeout(() => {
                window.addEventListener('keydown', onKeyDownMenu);
            }, 100);
            setFocus();
        }, []);
    }

    const onKeyDownMenu = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <FocusableButtonWithIcon
                    focusKey={'menu_rooms'}
                    icon={'home-outline'}
                    iconFocused={'home'}
                    title={btRoomsLabel}
                    onEnter={() => {
                        navigate(ROUTES.ROOMS, '/[slug]');
                    }}
                />
                <FocusableButtonWithIcon
                    focusKey={'menu_lights'}
                    icon={'lightbulb'}
                    iconFocused={'lightbulb-on'}
                    title={btLightsLabel}
                    onEnter={() => {
                        navigate(ROUTES.HOME, '/[slug]');
                    }}
                />
                <FocusableButtonWithIcon
                    focusKey={'menu_settings'}
                    icon={'settings'}
                    iconFocused={'settings'}
                    title={btSettingsLabel}
                    material
                    onEnter={() => {
                        navigate(ROUTES.SETTINGS, '/[slug]');
                    }}
                />
            </View>
            <View style={styles.containerBottom}>
                <View style={styles.aboutContainer}>
                    <FocusableButtonLabel
                        focusKey={'menu_modal'}
                        title={btAboutLabel}
                        onEnter={() => {
                            navigate(ROUTES.MODAL, '/[slug]');
                        }}
                    />
                </View>
                <View>
                    <FocusableButtonLabel
                        focusKey={'menu_exit'}
                        title={btExitLabel}
                        onEnter={() => {
                            navigate(ROUTES.EXIT, '/[slug]');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Menu) : Menu);
