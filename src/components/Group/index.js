import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { black, dark_gray, offwhite, white, yellow } from '../../constants/colors';
import LightItem from '../Light';

const Group = (props) => {
    const { group, onFocus } = props;
    const { id } = group;

    const Group = ({ group }) => (
        <LightItem
            isGroup
            light={group}
        />
    );
    const FocusableLightGroup = withFocusable()(Group);

    return(
        <FocusableLightGroup
            focusKey={`group_${id}`}
            group={group}
            onBecameFocused={onFocus}
        />
    );
};

export default Group;