import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Light from '../../components/Light';
import Room from '../../components/Room';
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

const notFoundTitle = 'No lights found...';
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
        return (<Room key={item.id} room={item} />);
    };
    
    
    if (!items) {
        return <Text>{notFoundTitle}</Text>;
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
