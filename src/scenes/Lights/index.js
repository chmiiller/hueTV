import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getLights } from '../../hueapi';

import List from '../list';

const screenTitle = 'All your lights';

const Lights = (props) => {
    const { setFocus } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [lights, setLights] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        fetchLights();

        return () => {
            setFocus('menu_groups');
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
        const _lights = await getLights();
        setIsLoaded(true);
        setLights(_lights);
        setFocus();
    };

    if (!isLoaded) {
        return <Text>Loading All Lights...</Text>;
    } else {
        return (
            <View style={themeStyles.screen}>
                <View style={styles.titleContainer}>
                    <Text style={themeStyles.textH2}>{screenTitle}</Text>
                </View>
                <List items={lights} type={'lights'} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    titleContainer: {
        marginVertical: getScaledValue(4),
        borderBottomWidth: 1,
        borderBottomColor: '#1c1c1c',
    },
});

export default withFocusable()(Lights);