import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';

import { offwhite, white } from '../../constants/colors';
import { primaryFont } from '../../constants/text';

const LoadingLabel = ({ text }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={offwhite} />
            {text && <Text style={styles.label}>{text}</Text> }
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
        fontSize: getScaledValue(12),
        marginHorizontal: getScaledValue(24),
        marginTop: getScaledValue(12),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});
export default LoadingLabel;