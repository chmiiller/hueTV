import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigate } from '@reach/router';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, dark_gray, offwhite, white, yellow } from '../../constants/colors';
import theme, { ROUTES } from '../../config';

const brightness_message = 'Brightness';
const switchHeight = 75;
const switchHeightFocused = 80;

const LightItem = (props) => {
    const { light } = props;
    const navigate = useNavigate(props);
    const { brightPercentage, id, isOn, name } = light;
    const [brightness, setBrightness] = useState(isOn ? brightPercentage : 0);

    const SwitchButton = ({ focused, isOn }) => {
        const containerLight = focused ? styles.containerLightFocused : styles.containerLight;
        const containerBg = focused ? styles.containerBgFocused : styles.containerBg;
        const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
        const brightnessHeight = getScaledValue((switchBaseHeight * brightness) * 0.01);
        const borderTop = brightness >= 93 ? 15 : 0;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{isOn ? `${brightness}% ${brightness_message}` : ' '}</Text>
                <View style={containerLight}>
                    <View style={[containerBg, {
                        height: brightnessHeight,
                        borderTopLeftRadius: borderTop,
                        borderTopRightRadius: borderTop,
                    }]} />
                    <View style={styles.iconContainer}>
                        <Icon name={brightness === 0 ? 'lightbulb' : 'lightbulb-on'} size={60} color={'white'} />
                    </View>
                </View>
            </View>
            
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);
    return(
        <FocusableComponent
            focusKey={`light_${id}`}
            isOn={isOn}
            onEnterPress={() => {
                navigate(ROUTES.DETAILS, { state: { light } });
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getScaledValue(24),
        marginLeft: getScaledValue(24),
    },
    containerLight: {
        backgroundColor: dark_gray,
        marginTop: getScaledValue(12),
        borderWidth: 1,
        borderColor: black,
        borderRadius: 15,
        flexDirection: 'column-reverse',
        width: getScaledValue(105),
        height: getScaledValue(75),
        opacity: 0.5,
    },
    containerLightFocused: {
        backgroundColor: dark_gray,
        marginTop: getScaledValue(12),
        borderWidth: 1,
        borderColor: black,
        borderRadius: 15,
        flexDirection: 'column-reverse',
        width: getScaledValue(110),
        height: getScaledValue(80),
        shadowColor: "#000",
        shadowOpacity: 0.42,
        shadowRadius: 16,
        opacity: 1,
    },
    containerBg: {
        backgroundColor: yellow,
        marginTop: getScaledValue(24),
        borderWidth: 1,
        borderColor: black,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        width: getScaledValue(105),
        height: getScaledValue(75),
    },
    containerBgFocused: {
        backgroundColor: yellow,
        marginTop: getScaledValue(24),
        borderWidth: 1,
        borderColor: black,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        width: getScaledValue(110),
        height: getScaledValue(80),
    },
    iconContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        zIndex: 5,
        width: '100%',
        bottom: getScaledValue(12),
        position: 'absolute',
    },
    title: {
        fontFamily: theme.primaryFontFamily,
        fontSize: getScaledValue(10),
        marginHorizontal: getScaledValue(20),
        color: white,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(8),
        marginTop: getScaledValue(4),
        color: offwhite,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

export default LightItem;