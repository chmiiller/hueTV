import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import { getLights } from '../../hueapi';
import LightItem from '../../components/Light';
import Theme, { themeStyles, hasWebFocusableUI } from '../../config';

const styles = StyleSheet.create({
    lightsContainer: { margin: 20, flexDirection: 'row', flexWrap: 'wrap' },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      }
});

const List = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [lights, setLights] = useState([]);
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
        const _lights = await getLights();
        setIsLoaded(true);
        setLights(_lights);
        setFocus();
    };

    const renderItems = (allLights) => {
        const items = allLights.map((luz) => 
            (<LightItem
                key={luz.id}
                light={luz}
                switchCallback={fetchLights} 
            />)
        );
        return items;
    };

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <ScrollView contentContainerStyle={themeStyles.container}>
                <View style={styles.lightsContainer}>
                    {renderItems(lights)}
                </View>
            </ScrollView>
        );
    }
};

// export default List;
export default (hasWebFocusableUI ? withFocusable()(List) : List);
