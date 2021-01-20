import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getScaledValue } from 'renative';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { getGroupsWithLights } from '../../hueapi';
import LightGroup from '../../components/LightGroup';
import { themeStyles, hasWebFocusableUI } from '../../config';

const styles = StyleSheet.create({
    scroll: {
        minHeight: getScaledValue(300),
        alignSelf: 'stretch',
        width: '100%',
        marginTop: getScaledValue(12),
    },
});

const List = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);
    const { setFocus } = props;
    let scrollRef;
    let handleFocus;
    let handleArrow;
    
    scrollRef = useRef(null);
    handleFocus = ({ y }) => {
        scrollRef.current.scrollTo({ y });
    };
    
    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        fetchLights();

        return () => {
            setFocus('menu_lights');
        }
    }, []);

    const onKeyDownList = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                setFocus('menu_lights');
                break;
        }
    }

    const fetchLights = async() => {
        const _groups = await getGroupsWithLights();
        setIsLoaded(true);
        setGroups(_groups);
        setFocus();
    };

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <ScrollView
                contentContainerStyle={styles.scroll}
                ref={scrollRef}
            >
            {groups.map(g => (
                <LightGroup
                    key={g.id}
                    group={g}
                    onFocus={handleFocus}
                />
            ))}   
            </ScrollView>
        );
    }
};

export default (hasWebFocusableUI ? withFocusable()(List) : List);
