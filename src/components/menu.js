/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { getScaledValue, useNavigate, StyleSheet } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { hasWebFocusableUI, ROUTES } from '../config';
import { black, white, yellow } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 0,
        marginTop: getScaledValue(20),
        maxWidth: getScaledValue(400),
        minWidth: getScaledValue(50),
        borderWidth: 0,
        opacity: 0.5,
    },
    buttonFocus: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 0,
        marginTop: getScaledValue(20),
        maxWidth: getScaledValue(400),
        minWidth: getScaledValue(50),
        borderWidth: 0,
    },
    buttonText: {
        color: white,
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(15),
        marginLeft: 20,
    },
    buttonTextFocus: {
        color: yellow,
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(15),
        marginLeft: 20,
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

    const MenuButton = ({ focused, icon, iconFocused, label, material}) => {
        const IconComponent = material ? (
            <MaterialIcon name={focused ? iconFocused : icon} size={30} color={focused ? yellow : white} />
        )
        : (
            <Icon name={focused ? iconFocused : icon} size={30} color={focused ? yellow : white} />
        );
        return (
            <View style={focused ? styles.buttonFocus : styles.button} >
                {IconComponent}
                <Text style={focused ? styles.buttonTextFocus : styles.buttonText}>{label}</Text>
            </View>
        );
    };

    const FocusableComponent = withFocusable()(MenuButton);
    return (
        <View style={styles.container}>
            <FocusableComponent
                focusKey={'menu_lights'}
                icon={'lightbulb'}
                iconFocused={'lightbulb-on'}
                label={'Lights'}
                onEnterPress={() => {
                    navigate(ROUTES.HOME, '/[slug]');
                }}
            />
            <FocusableComponent
                focusKey={'menu_settings'}
                icon={'settings'}
                iconFocused={'settings'}
                label={'Settings'}
                material
                onEnterPress={() => {
                    navigate(ROUTES.SETTINGS, '/[slug]');
                }}
            />
            <FocusableComponent
                focusKey={'menu_modal'}
                icon={'open-in-new'}
                iconFocused={'open-in-new'}
                label={'Modal'}
                onEnterPress={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
            />
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Menu) : Menu);
