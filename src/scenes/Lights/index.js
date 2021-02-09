import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getLights } from '../../hueapi';

import List from '../List';

const screenTitle = 'All lights';
const loadingTitle = 'Loading lights...';

const Lights = (props) => {
    const { setFocus } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [lights, setLights] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        setFocus();
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

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <View style={styles.loadingContainer}>
                    {/* <Text style={themeStyles.textH2}>{loadingTitle}</Text> */}
                </View>
            ) : (
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={themeStyles.textH2}>{screenTitle}</Text>
                    </View>
                    <List items={lights} type={'lights'} />
                </View>
                
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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

export default withFocusable()(Lights);