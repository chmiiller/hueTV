import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { themeStyles, hasWebFocusableUI } from '../../config';
import { black, offwhite, white,  yellow } from '../../constants/colors';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        marginVertical: 12
    },
    switchContainer: {
        backgroundColor: '#2e2e30',
        flex: 1,
        flexDirection: 'column-reverse',
        width: '30%',
        minHeight: getScaledValue(320),
        maxWidth: getScaledValue(150),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginTop: 24,
    },
    switchBg: {
        backgroundColor: yellow,
        borderRadius: 20,
        height: '20%',
    },
    logoContainer: {
        bottom: 0,
        left: 0,
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: "absolute",
    },
    subtitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(10),
        marginHorizontal: getScaledValue(20),
        marginTop: getScaledValue(2),
        color: offwhite,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

const ScreenLightDetails = () => {
    const [brightness, setBrightness] = useState(20);
    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{'Living Room Lamp 1'}</Text>
                <Text style={styles.subtitle}>{`${brightness}% Brightness`}</Text>
                <View style={styles.switchContainer}>
                    <View style={[styles.switchBg, {height: `${brightness}%`}]} />
                    <View style={styles.logoContainer} >
                        <Icon name={brightness === 0 ? 'lightbulb' : 'lightbulb-on'} size={60} color={'white'} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            if (brightness > 0) {
                                setBrightness(brightness-10);
                            }
                        }}
                        title={'Darker!'}
                    />
                    <Button
                        onPress={() => {
                            if (brightness < 100) {
                                setBrightness(brightness+10);
                            }
                        }}
                        title={'Brighter!'}
                    />
                </View>
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenLightDetails) : ScreenLightDetails);
