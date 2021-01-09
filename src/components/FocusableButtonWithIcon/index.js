import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import Theme from '../../config';
import { white, yellow } from '../../constants/colors';

const styles = StyleSheet.create({
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

const FocusableButtonWithIcon = ({
    title,
    icon,
    iconFocused,
    material, // if should use Material Icons instead
    focusKey,
    onEnter,
    onFocus,
    onBlur,
}) => {
    const ButtonIcon = ({ focused, icon, iconFocused, material }) => {
        if (material) {
            return <MaterialIcon name={focused ? iconFocused : icon} size={30} color={focused ? yellow : white} />;
        } else {
            return <Icon name={focused ? iconFocused : icon} size={30} color={focused ? yellow : white} />;
        }
    };

    const ButtonWithIcon = ({ focused, icon, iconFocused, label, material }) => {
        const IconComponent = ButtonIcon({ focused, icon, iconFocused, material });
        return (
            <View style={focused ? styles.buttonFocus : styles.button} >
                {IconComponent}
                <Text style={focused ? styles.buttonTextFocus : styles.buttonText}>{label}</Text>
            </View>
        );
    };

    const DefaultButtonWithIcon = withFocusable()(ButtonWithIcon);
    return (
        <DefaultButtonWithIcon
            focusKey={focusKey}
            label={title}
            onEnterPress={onEnter}
            icon={icon}
            iconFocused={iconFocused || icon}
            material={material}
            onBecameFocused={() => {
                if(onFocus) {
                    onFocus();
                }
            }}
            onBecameBlurred={() => {
                if(onBlur) {
                    onBlur();
                }
            }}
        />
    );
};

export default FocusableButtonWithIcon;
