import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import Light from '../../components/Light';
import Room from '../../components/Room';
import { hasWebFocusableUI, themeStyles } from '../../config';

const styles = StyleSheet.create({
    scroll: {
        minHeight: getScaledValue(300),
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: getScaledValue(12),
        paddingHorizontal: getScaledValue(36),
        paddingBottom: getScaledValue(12),
    },
    titleContainer: {
        marginTop: getScaledValue(16),
        marginBottom: getScaledValue(4)
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const notFoundTitle = 'No lights found...';
const List = ({ items, type }) => {
    let scrollRef;
    let handleFocus;
    scrollRef = useRef(null);
    handleFocus = ({ y }) => {
        scrollRef.current.scrollTo({ y });
    };
    
    const LightItems = ({ item }) => {
        if (type === 'lights') {
            return (<Light key={item.id} light={item} onFocus={handleFocus} />);
        }
        return (<Room key={item.id} room={item} onFocus={handleFocus} />);
    };
    
    if (!items || items.length === 0) {
        return (
            <View style={themeStyles.screen}>
                <View style={styles.titleContainer}>
                    <Text style={themeStyles.textH2}>{notFoundTitle}</Text>
                </View>
            </View>
        );
    } else {
        return (
            <ScrollView contentContainerStyle={styles.scroll} ref={scrollRef} >
                {items.map(item => (
                    <LightItems key={item.id} item={item}/>)
                )}
            </ScrollView>
        );
    }
};

export default (hasWebFocusableUI ? withFocusable()(List) : List);
