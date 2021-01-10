import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Theme from '../../config';
import { white, yellow } from '../../constants/colors';

const styles = StyleSheet.create({
    buttonText: {
        color: white,
        textAlign: 'center',
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(10),
        opacity: 0.5,
    },
    buttonTextFocus: {
        color: yellow,
        textAlign: 'center',
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(10),
        opacity: 1,
    }
});

const FocusableButtonLabel = ({
    title,
    focusKey,
    onEnter,
    onFocus,
    onBlur,
}) => {
    const DefaultButtonLabel = ({ focused, label }) => {
        return (
            <Text style={focused ? styles.buttonTextFocus : styles.buttonText}>{label}</Text>
        );
    };
    const FocusableDefaultButtonLabel = withFocusable()(DefaultButtonLabel);
    return (
        <FocusableDefaultButtonLabel
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

export default FocusableButtonLabel;
