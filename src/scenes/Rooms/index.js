import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getGroups } from '../../api/hueapi'; // groups are rooms on Hue API terminology

import List from '../List';

const screenTitle = 'All rooms';
const loadingTitle = 'Loading rooms...';

const Rooms = ({ setFocus }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        setFocus();
        fetchRooms();
    }, []);

    const onKeyDownList = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                setFocus('menu_rooms');
                break;
        }
    }

    const fetchRooms = async() => {
        const _rooms = await getGroups();
        setIsLoaded(true);
        setRooms(_rooms);
        setFocus();
    };

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <View style={styles.loadingContainer}>
                    {/* <Text style={themeStyles.textH2}>{loadingTitle}</Text> */}
                </View>
            ) : (
                <View style={themeStyles.screen}>
                    <View style={styles.titleContainer}>
                        <Text style={themeStyles.textH2}>{screenTitle}</Text>
                    </View>
                    <List items={rooms} type={'rooms'} />
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

export default withFocusable()(Rooms);