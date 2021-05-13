import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';

import { offwhite, white } from '../../constants/colors';
import { primaryFont } from '../../constants/text';
import FocusableButton from '../FocusableButton';

const EmptyState = ({
    title = '',
    subtitle = '',
    buttonTitle = '',
    onClick,
}) => {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.label}>{title}</Text> }
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
            <FocusableButton
                focusKey={buttonTitle}
                title={`  ${buttonTitle}  `}
                onEnter={onClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontFamily: primaryFont,
        color: white,
        fontSize: getScaledValue(14),
        marginHorizontal: getScaledValue(24),
        marginTop: getScaledValue(12),
        marginBottom: getScaledValue(8),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: primaryFont,
        color: white,
        fontSize: getScaledValue(10),
        marginHorizontal: getScaledValue(24),
        marginBottom: getScaledValue(12),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});
export default EmptyState;