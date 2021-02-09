import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getGroups } from '../../hueapi';

import List from '../List';

const screenTitle = 'All rooms';
const loadingTitle = 'Loading rooms...';

const Groups = (props) => {
    const { setFocus } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        setFocus();
        fetchGroups();
    }, []);

    const onKeyDownList = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                setFocus('menu_groups');
                break;
        }
    }

    const fetchGroups = async() => {
        const _groups = await getGroups();
        setIsLoaded(true);
        setGroups(_groups);
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
                    <List items={groups} type={'groups'} />
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

export default withFocusable()(Groups);