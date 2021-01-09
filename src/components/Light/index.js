import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigate } from '@reach/router';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black, white, yellow } from '../../constants/colors';
import { ROUTES } from '../../config';

const LightItem = (props) => {
    const { light } = props;
    const navigate = useNavigate(props);
    const { id, isOn, name } = light;

    const SwitchButton = ({ focused, isOn }) => {
        const containerStyle = focused ? styles.containerBgFocus : styles.containerBg;
        return (
            <View style={containerStyle}>
                <View style={styles.container} >
                    <Icon name={'lightbulb'} size={50} color={isOn ? yellow : white} />
                    <Text style={{color: white, marginTop: 12}}>{`${name}`}</Text> 
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
    containerBg: {
        backgroundColor: black,
        borderRadius: 15,
        justifyContent: 'center',
        margin: 12,
        width: getScaledValue(100),
        height: getScaledValue(70),
    },
    containerBgFocus: {
        backgroundColor: black,
        borderWidth: 1,
        borderColor: white,
        borderRadius: 15,
        justifyContent: 'center',
        margin: 12,
        width: getScaledValue(100),
        height: getScaledValue(70),
    },
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        zIndex: 5,
    },
  });

export default LightItem;