import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles, groupLights } from '../../config';
import { getLights, getGroupsWithLights } from '../../api/hueapi';

import List from '../List';
import Grouped from '../List/Grouped';
import LoadingLabel from '../../components/LoadingLabel';

const screenTitle = 'All lights';
const loadingTitle = 'Loading lights...';

const Lights = ({ setFocus }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [lights, setLights] = useState([]);
    const [groupedLights, setGroupedLights] = useState([]);

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
        const _allGrouped = await getGroupsWithLights();
        setTimeout(() => {
            setIsLoaded(true);
            setLights(_lights);
            setGroupedLights(_allGrouped);
            setFocus();
        }, 1000);
    };

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <LoadingLabel text={loadingTitle} />
            ) : (
                <View style={themeStyles.screen}>
                    <View style={styles.titleContainer}>
                        <Text style={themeStyles.textH2}>{screenTitle}</Text>
                    </View>
                    {groupLights ? (
                        <Grouped items={groupedLights} />
                    ) : (
                        <List items={lights} type={'lights'} />
                    )}
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
});

export default withFocusable()(Lights);