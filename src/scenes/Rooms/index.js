import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';

import { themeStyles } from '../../config';
import { getGroups } from '../../api/hueapi'; // groups are rooms on Hue API terminology

import List from '../List';
import LoadingLabel from '../../components/LoadingLabel';

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
        setTimeout(() => {
            setIsLoaded(true);
            setRooms(_rooms);
            setFocus();
        }, 1000);
    };

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <LoadingLabel text={loadingTitle}/>
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
});

export default withFocusable()(Rooms);