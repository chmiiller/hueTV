import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Light from '../../components/Light';
import Group from '../../components/Group';
import { hasWebFocusableUI } from '../../config';

const styles = StyleSheet.create({
    scroll: {
        minHeight: getScaledValue(300),
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: getScaledValue(12),
    },
});

const List = (props) => {
    const { setFocus, items, type } = props;
    
    // let scrollRef;
    // let handleFocus;
    // scrollRef = useRef(null);
    // handleFocus = ({ y }) => {
    //     scrollRef.current.scrollTo({ y });
    // };
    
    const LightItems = ({ item }) => {
        if (type === 'lights') {
            return (<Light key={item.id} light={item} />);
        }
        return (<Group key={item.id} group={item} />);
    };
    
    
    if (!items) {
        return <Text>No lights to render...</Text>;
    } else {
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
                {items.map(item => (
                    <LightItems key={item.id} item={item}/>)
                )}
            </ScrollView>
        );
    }
};

export default (hasWebFocusableUI ? withFocusable()(List) : List);
