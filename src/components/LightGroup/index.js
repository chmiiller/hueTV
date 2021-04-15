import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { black, dark_gray, offwhite, white, yellow } from '../../constants/colors';
import LightItem from '../Light';

const LightGroup = ({ group, onFocus }) => {
    const { id, name, lights } = group;

    const GroupTitle = ({ focused }) => (
        <Text style={focused ? styles.groupTitleFocused : styles.groupTitle}>{name}</Text>
    );
    const FocusableGroupTitle = withFocusable()(GroupTitle);

    const Group = ({ groupLights }) => {
        return (
            <View style={styles.container}>
                <FocusableGroupTitle trackChildren hasFocusedChild focusKey={`group_title_${id}`} />
                <View style={styles.lightsContainer}>
                    {groupLights.map(light => {
                        return (<LightItem key={`light_${light.id}`} light={light} invertTitle/>);
                    })}
                </View>
            </View>
        );
    };
    const FocusableLightGroup = withFocusable()(Group);

    return (
        <FocusableLightGroup
            trackChildren
            hasFocusedChild
            focusKey={`group_${id}`}
            name={name}
            groupLights={lights}
            onBecameFocused={onFocus}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: getScaledValue(12),
        width: '100%',
    },
    lightsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: getScaledValue(-5),
    },
    groupTitle: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(15),
        marginTop: getScaledValue(16),
        marginLeft: getScaledValue(20),
        color: white,
        textAlign: 'left',
    },
    groupTitleFocused: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: getScaledValue(15),
        marginTop: getScaledValue(16),
        marginLeft: getScaledValue(20),
        color: yellow,
        textAlign: 'left',
    },
});

export default LightGroup;