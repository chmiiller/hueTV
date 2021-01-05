import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { themeStyles, hasWebFocusableUI } from '../../config';
import { black, black_pure, offwhite, white,  yellow } from '../../constants/colors';
import { setLightBrightness, turnLightOn, turnLightOff } from '../../hueapi'

const styles = StyleSheet.create({
    switchContainer: {
        backgroundColor: '#2e2e30',
        flex: 1,
        flexDirection: 'column-reverse',
        width: '30%',
        minHeight: getScaledValue(280),
        maxWidth: getScaledValue(110),
        borderRadius: 40,
        borderWidth: 1,
        marginTop: 24,
    },
    switchContainerFocused: {
        backgroundColor: '#2e2e30',
        flex: 1,
        flexDirection: 'column-reverse',
        width: '30%',
        minHeight: getScaledValue(300),
        maxWidth: getScaledValue(130),
        borderRadius: 40,
        borderWidth: 1,
        marginTop: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.58,
        shadowRadius: 16,
    },
    switchBg: {
        backgroundColor: yellow,
        borderRadius: 40,
        height: '20%',
    },
    iconContainer: {
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
    const [lampOn, setLampOn] = useState(true);

    const Switch = ({ focused }) => {
        const containerStyle = focused ? styles.switchContainerFocused : styles.switchContainer;
        return (
            <View style={containerStyle}>
                <View style={[styles.switchBg, {height: `${brightness}%`}]} />
                <View style={styles.iconContainer} >
                    <Icon name={brightness === 0 ? 'lightbulb' : 'lightbulb-on'} size={60} color={'white'} />
                </View>
            </View>
        );
    };
    const LightSwitch = withFocusable()(Switch);

    const makeBrighter = async (setFocus) => {
        if (brightness < 100) {
            await setLightBrightness({ id: 4, percentage: brightness+10});
            setBrightness(brightness+10);
        }
        setFocus('switch');
    }
    
    const makeDarker =  async (setFocus) => {
        if (brightness > 0) {
            await setLightBrightness({ id: 4, percentage: brightness-10});
            setBrightness(brightness-10);
        }
        setFocus('switch');
    }

    const onArrow = (direction, { setFocus }) => {
        switch (direction) {
            case 'up':
                makeBrighter(setFocus);
            break;
            
            case 'down':
                makeDarker(setFocus);
            break;
            
            case 'left':
                setFocus('menu_lights');
            break;
        
            default:
                setFocus('menu_lights');
                break;
        }
    };

    const onEnter = ({ setFocus }) => {
        if (lampOn && brightness > 0) {
            turnLightOff(4);
            setBrightness(0);
            setLampOn(false);
            setFocus();
            return
        }
        if (!lampOn) {
            turnLightOn(4);
            setBrightness(20);
            setLampOn(true);
            setFocus();
            return
        }
    };



    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{'Living Room Lamp 1'}</Text>
                <Text style={styles.subtitle}>{`${brightness}% Brightness`}</Text>
                <LightSwitch blockNavigationOut focusKey={'switch'} onEnterPress={onEnter} onArrowPress={onArrow}/>
            </View>
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(ScreenLightDetails) : ScreenLightDetails);
