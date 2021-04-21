import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { black, dark_gray, white } from '../../../constants/colors';

const Step = ({
    focusKey,
    title,
    onEnter,
    status,
}) => {
    const { available, completed, subtitle } = status;
    const DefaultStep = ({ focused }) => {
        return (
            <View
                style={[styles.container, {
                    backgroundColor: focused ? black : 'transparent',
                    opacity: available ? 1 : 0.5,
                }]}
            >
                {completed &&
                    <MaterialIcon name={'check-circle'} size={60} color={'#1DB954'} />
                }
                <View style={styles.messageContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
        );
    }

    const FocusableStep = withFocusable()(DefaultStep);
    return (
        <FocusableStep
            focusKey={focusKey}
            onEnterPress={() => {
                if (available) {
                    onEnter();
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: getScaledValue(12),
        marginLeft: getScaledValue(12),
        paddingLeft: getScaledValue(12),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'teal',
        minHeight: getScaledValue(60),
    },
    iconContainer: {
        width: getScaledValue(60),
        height: getScaledValue(60),
    },
    messageContainer: {
        flexDirection: 'column',
        marginLeft: getScaledValue(12),
        padding: getScaledValue(12),
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'pink',
    },
    title: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(15),
        color: white, 
        textAlign: 'left',
    },
    subtitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(12),
        marginTop: getScaledValue(4),
        color: white, 
        textAlign: 'left',
    },
});

export default Step;