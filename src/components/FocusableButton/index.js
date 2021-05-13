import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Theme from '../../config';
import { dark_gray, white, yellow } from '../../constants/colors';

const styles = StyleSheet.create({
    button: {
        backgroundColor: dark_gray,
        
        minHeight: getScaledValue(30),
        minWidth: getScaledValue(60),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 12,
        marginBottom: 4,
        opacity: 0.5,
    },
    buttonFocus: {
        backgroundColor: dark_gray,
        minHeight: getScaledValue(30),
        minWidth: getScaledValue(60),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 12,
        marginBottom: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        opacity: 1,
    },
    buttonText: {
        color: white,
        textAlign: 'center',
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(12),
    },
    buttonTextFocus: {
        color: yellow,
        textAlign: 'center',
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(12),
    }
});

const FocusableButton = ({
    title,
    focusKey,
    onEnter,
    onFocus,
    onBlur,
}) => {
    const DefaultButton = ({ focused, label }) => {
        return (
            <View style={focused ? styles.buttonFocus : styles.button} >
                <Text style={focused ? styles.buttonTextFocus : styles.buttonText}>{label}</Text>
            </View>
        );
    };
    const FocusableDefaultButton = withFocusable()(DefaultButton);
    return (
        <FocusableDefaultButton
            focusKey={focusKey}
            label={title}
            onEnterPress={onEnter}
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

export default FocusableButton;
