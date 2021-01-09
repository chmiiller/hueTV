/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { getScaledValue, useNavigate, StyleSheet } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';

import Theme, { hasWebFocusableUI, ROUTES } from '../config';
import { black } from '../constants/colors';
import FocusableButtonWithIcon from '../components/FocusableButtonWithIcon'; 

if (hasWebFocusableUI) {
    initNavigation({
        debug: false,
        visualDebug: false,
        nativeMode: false
    });
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getScaledValue(40),
        paddingLeft: getScaledValue(40),
        width: Theme.menuWidth,
        height: Theme.menuHeight,
        backgroundColor: black,
        alignItems: 'flex-start',
        borderBottomWidth: 0,
        flexDirection: 'column'
    },
});

const Menu = (props) => {
    const { setFocus } = props;
    const navigate = useNavigate(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            setFocus();
        }, []);
    }

    return (
        <View style={styles.container}>
            <FocusableButtonWithIcon
                focusKey={'menu_lights'}
                icon={'lightbulb'}
                iconFocused={'lightbulb-on'}
                title={'Lights'}
                onEnter={() => {
                    navigate(ROUTES.HOME, '/[slug]');
                }}
            />
            <FocusableButtonWithIcon
                focusKey={'menu_settings'}
                icon={'settings'}
                iconFocused={'settings'}
                title={'Settings'}
                material
                onEnter={() => {
                    navigate(ROUTES.SETTINGS, '/[slug]');
                }}
            />
            <FocusableButtonWithIcon
                focusKey={'menu_modal'}
                icon={'open-in-new'}
                iconFocused={'open-in-new'}
                title={'Modal'}
                onEnter={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
            />
            <FocusableButtonWithIcon
                focusKey={'menu_exit'}
                icon={'open-in-new'}
                iconFocused={'open-in-new'}
                title={'Exit Application'}
                onEnter={() => {
                    navigate(ROUTES.EXIT, '/[slug]');
                }}
            />
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Menu) : Menu);
