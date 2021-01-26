import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getGroups } from '../../hueapi';

import List from '../list';

const screenTitle = 'All your groups';

const Groups = (props) => {
    const { setFocus } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        fetchGroups();

        return () => {
            setFocus('menu_groups');
        }
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

    if (!isLoaded) {
        return <Text>Loading Groups...</Text>;
    } else {
        return (
            <View style={themeStyles.screen}>
                <View style={styles.titleContainer}>
                    <Text style={themeStyles.textH2}>{screenTitle}</Text>
                </View>
                <List items={groups} type={'groups'} />
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

export default withFocusable()(Groups);