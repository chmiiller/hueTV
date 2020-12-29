import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { getLights } from '../../hueapi';
import LightItem from '../../components/Light';
import Theme, { themeStyles, hasWebFocusableUI } from '../../config';

const styles = StyleSheet.create({
    flatList: {
        marginTop: 0,
    },
});

const FocusableView = withFocusable()(View);

const List = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [lights, setLights] = useState([]);
    useEffect(() => {
        fetchLights();
    }, []);

    const fetchLights = async() => {
        const _lights = await getLights();
        setIsLoaded(true);
        setLights(_lights);
    };

    const renderItems = () => {
        const items = lights.map(luz => {
            return (
                <LightItem
                    key={luz.id}
                    light={luz}
                    switchCallback={fetchLights} 
                />
            );
        });
        return items;
    };

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <ScrollView contentContainerStyle={themeStyles.container}>
                <FocusableView style={{ margin: 20, flexDirection: 'row' }}>
                    {renderItems()}
                </FocusableView>
            </ScrollView>
        );
    }
};

export default List;
