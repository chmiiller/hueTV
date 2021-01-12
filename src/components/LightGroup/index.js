import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigate } from '@reach/router';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { black, dark_gray, offwhite, white, yellow } from '../../constants/colors';
import LightItem from '../Light';
import theme, { ROUTES, themeStyles } from '../../config';

const LightGroup = (props) => {
    const { group } = props;
    const navigate = useNavigate(props);
    const { id, name, lights } = group;

    const Group = ({ focused, name, groupLights }) => {
        return (
            <View style={styles.container}>
                <Text style={themeStyles.textH2}>{name}</Text>
                {groupLights.map(light => {
                    return (<LightItem key={`light_${light.id}`} light={light}/>);
                })}
            </View>
        );
    };
    const FocusableComponent = withFocusable()(Group);
    return(
        <FocusableComponent
            focusKey={`group_${id}`}
            name={name}
            groupLights={lights}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: getScaledValue(12),
        width: '100%',
        
    },
});

export default LightGroup;