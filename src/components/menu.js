/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon, Button, getScaledValue, useNavigate, useOpenDrawer, StyleSheet } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasHorizontalMenu, hasWebFocusableUI, ROUTES } from '../config';

if (hasWebFocusableUI) {
    initNavigation({
        debug: false,
        visualDebug: false,
        nativeMode: false
    });
}

export const DrawerButton = (props) => {
    const openDrawer = useOpenDrawer(props);
    return (
        <Icon
            iconFont="ionicons"
            iconName="md-menu"
            iconColor={Theme.color3}
            size={Theme.iconSize}
            style={themeStyles.icon}
            onPress={() => {
                openDrawer('Drawer');
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: getScaledValue(hasHorizontalMenu ? 20 : 40),
        paddingLeft: getScaledValue(hasHorizontalMenu ? 40 : 40),
        width: Theme.menuWidth,
        height: Theme.menuHeight,
        backgroundColor: Theme.color0,
        alignItems: 'flex-start',
        // borderRightWidth: getScaledValue(hasHorizontalMenu ? 0 : 1),
        borderBottomWidth: getScaledValue(hasHorizontalMenu ? 1 : 0),
        // borderColor: Theme.color5,
        flexDirection: hasHorizontalMenu ? 'row' : 'column'
    },
    button: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginHorizontal: hasHorizontalMenu ? getScaledValue(20) : 0,
        marginTop: hasHorizontalMenu ? 0 : getScaledValue(20),
        maxWidth: getScaledValue(400),
        minWidth: getScaledValue(50),
        borderWidth: 0,
        opacity: 0.5,
    },
    buttonText: {
        color: Theme.white,
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(15)
    }
});

const Menu = (props) => {
    const { setFocus } = props;
    const navigate = useNavigate(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            setFocus();
        }, []);
    }

    const MenuButton = ({  }) => {

    };

    return (
        <View style={styles.container}>
            <Button
                // to={ROUTES.HOME}
                title=" Lights"
                iconFont="fontAwesome"
                className="focusable"
                iconName="lightbulb-o"
                iconColor={Theme.yellow}
                iconSize={Theme.iconSizeSmall}
                style={styles.button}
                activeOpacity={1}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate(ROUTES.HOME, '/[slug]');
                }}
                onEnterPress={() => {
                    navigate(ROUTES.HOME, '/[slug]');
                }}
            />
            <Button
                title="Settings"
                iconFont="fontAwesome"
                iconName="gear"
                className="focusable"
                iconColor={Theme.yellow}
                iconSize={Theme.iconSizeSmall}
                style={styles.button}
                activeOpacity={1}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate(ROUTES.SETTINGS, '/[slug]');
                }}
                onEnterPress={() => {
                    navigate(ROUTES.SETTINGS, '/[slug]');
                }}
            />
            <Button
                // to={ROUTES.MODAL}
                title="My Modal"
                iconFont="ionicons"
                className="focusable"
                iconName="ios-albums"
                iconColor={Theme.yellow}
                iconSize={Theme.iconSizeSmall}
                style={styles.button}
                activeOpacity={1}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
                onEnterPress={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
            />
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Menu) : Menu);
