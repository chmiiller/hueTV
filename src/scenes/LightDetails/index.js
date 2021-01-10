import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue, usePop } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { themeStyles, hasWebFocusableUI } from '../../config';
import { dark_gray, offwhite, yellow } from '../../constants/colors';
import { setLightBrightness, turnLightOn, turnLightOff } from '../../hueapi'

const tutorial_message = 'Arrows Up / Down: Brightness\nSelect Button: On / Off';
const brightness_message = 'Brightness';
const switchHeight = 310;
const brightness_amount = 10;

const ScreenLightDetails = (props) => {
    const pop = usePop(props);
    const { setFocus } = props;
    const { light } = props.location.state;
    const [brightness, setBrightness] = useState(light.isOn ? light.brightPercentage : 0);
    const [savedBrightness, setSavedBrightness] = useState(light.brightPercentage);
    const [lampOn, setLampOn] = useState(light.isOn);

    useEffect(() => {
        setFocus(`switch_${light.id}`);
        setTimeout(() => {
            window.addEventListener('keydown', onDetailsKeyDown);
        }, 100);
    }, []);
    
    const onDetailsKeyDown = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                pop();
                break;
        }
    }

    const Switch = ({ focused }) => {
        const containerStyle = focused ? styles.switchContainerFocused : styles.switchContainer;
        const brightnessHeight = getScaledValue((switchHeight * brightness) * 0.01);
        const borderTop = brightness >= 95 ? 40 : 0;
        return (
            <View style={containerStyle}>
                <View style={[styles.switchBg, {
                    height: brightnessHeight,
                    borderTopLeftRadius: borderTop,
                    borderTopRightRadius: borderTop,
                }]} />
                <View style={styles.iconContainer} >
                    <Icon name={brightness === 0 ? 'lightbulb' : 'lightbulb-on'} size={64} color={'white'} />
                </View>
            </View>
        );
    };
    const LightSwitch = withFocusable()(Switch);

    const makeBrighter = async () => {
        if (!lampOn) {
            setLightOn();
            return;
        }
        const newBrightness = brightness + brightness_amount;
        if (newBrightness < 100) {
            await setLightBrightness({ id: light.id, percentage: newBrightness});
            setBrightness(newBrightness);
        } else {
            await setLightBrightness({ id: light.id, percentage: 100});
            setBrightness(100);
        }
        setFocus(`switch_${light.id}`);
    }
    
    const makeDarker =  async () => {
        const newBrightness = brightness - brightness_amount;
        if (newBrightness > 0) {
            await setLightBrightness({ id: light.id, percentage: newBrightness});
            setBrightness(newBrightness);
        } else {
            setLightOff();
        }
        setFocus(`switch_${light.id}`);
    }

    const setLightOn = () => {
        turnLightOn(light.id);
        setBrightness(savedBrightness);
        setLampOn(true);
        setFocus(`switch_${light.id}`);
        return
    };
    
    const setLightOff = () => {
        turnLightOff(light.id);
        setSavedBrightness(brightness);
        setBrightness(0);
        setLampOn(false);
        setFocus(`switch_${light.id}`);
        return
    };

    const onArrow = (direction, { setFocus }) => {
        switch (direction) {
            case 'up':
                makeBrighter();
            break;
            
            case 'down':
                makeDarker();
            break;
            
            case 'left':
                setFocus('menu_lights');
            break;
        
            default:
                setFocus('menu_lights');
                break;
        }
    };

    const onEnter = () => {
        if (lampOn && brightness > 0) {
            setLightOff();
            return
        }
        if (!lampOn) {
            setLightOn();
            return
        }
    };

    return (
        <View style={themeStyles.screen}>
            <View style={themeStyles.container}>
                <Text style={themeStyles.textH2}>{light.name}</Text>
                <Text style={styles.subtitle}>{`${brightness}% ${brightness_message}`}</Text>
                <LightSwitch focusKey={`switch_${light.id}`} onEnterPress={onEnter} onArrowPress={onArrow}/>
                <Text style={styles.tutorial}>{tutorial_message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        backgroundColor: dark_gray,
        flex: 1,
        flexDirection: 'column-reverse',
        width: '30%',
        minHeight: getScaledValue(switchHeight),
        maxWidth: getScaledValue(130),
        borderRadius: 40,
        borderWidth: 1,
        marginTop: 30,
        opacity: 0.5,
    },
    switchContainerFocused: {
        backgroundColor: dark_gray,
        flex: 1,
        flexDirection: 'column-reverse',
        width: '30%',
        minHeight: getScaledValue(switchHeight),
        maxWidth: getScaledValue(130),
        borderRadius: 40,
        borderWidth: 1,
        marginTop: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        opacity: 1,
    },
    switchBg: {
        backgroundColor: yellow,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        height: 30,
    },
    iconContainer: {
        bottom: 12,
        left: 0,
        height: getScaledValue(45),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: "absolute",
    },
    subtitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(10),
        marginTop: getScaledValue(4),
        marginBottom: getScaledValue(4),
        color: offwhite,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    tutorial: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(8),
        marginTop: getScaledValue(24),
        color: offwhite,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default (hasWebFocusableUI ? withFocusable()(ScreenLightDetails) : ScreenLightDetails);
