import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import LightGroup from '../../components/LightGroup';
import { black, dark_gray, offwhite, white, yellow } from '../../constants/colors';
import theme, { hasWebFocusableUI, themeStyles } from '../../config';

const styles = StyleSheet.create({
    scroll: {
        minHeight: getScaledValue(300),
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginTop: getScaledValue(12),
        paddingLeft: getScaledValue(12),
        paddingBottom: getScaledValue(12),
    },
    groupedContainer: {
        minHeight: getScaledValue(100),
        marginTop: getScaledValue(32),
        backgroundColor: black,
        paddingRight: getScaledValue(12),
    },
    lightsContainer: {
        minHeight: getScaledValue(100),
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: getScaledValue(12),
    },
    title: {
        fontFamily: theme.primaryFontFamily,
        fontSize: getScaledValue(10),
        marginHorizontal: getScaledValue(20),
        marginTop: getScaledValue(12),
        color: white,
    },
    titleContainer: {
        marginTop: getScaledValue(16),
        marginBottom: getScaledValue(4)
    },
});

const notFoundTitle = 'No lights found...';
const Grouped = ({ items }) => {
    let scrollRef;
    let handleFocus;
    scrollRef = useRef(null);
    handleFocus = ({ y }) => {
        scrollRef.current.scrollTo({ y });
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
            <ScrollView contentContainerStyle={styles.scroll} ref={scrollRef}>
                {items.map(group => (
                    <LightGroup
                        key={group.id}
                        group={group}
                        onFocus={handleFocus}
                    />)
                )}
            </ScrollView>
        );
    }
};

export default (hasWebFocusableUI ? withFocusable()(Grouped) : Grouped);
