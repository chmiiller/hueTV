import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { getGroupsWithLights } from '../../hueapi';
import LightGroup from '../../components/LightGroup';
import { themeStyles, hasWebFocusableUI } from '../../config';

const styles = StyleSheet.create({
    lightsContainer: { margin: 20 },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});

const List = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);
    const { setFocus } = props;
    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        fetchLights();
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
            <ScrollView contentContainerStyle={themeStyles.container}>
                <View style={styles.lightsContainer}>
                    {groups.map(g => <LightGroup key={g.id} group={g}/>)}
                </View>
            </ScrollView>
        );
    }
};

export default (hasWebFocusableUI ? withFocusable()(List) : List);
