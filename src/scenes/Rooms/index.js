import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';
import { useNavigate } from '@reach/router';

import { ROUTES, themeStyles } from '../../config';
import { getGroups } from '../../api/hueapi'; // groups are rooms on Hue API terminology

import List from '../List';
import LoadingLabel from '../../components/LoadingLabel';
import EmptyState from '../../components/EmptyState';

const screenTitle = 'All rooms';
const loadingTitle = 'Loading rooms...';
const emptyTitle = 'No rooms found.';
const emptySubtitle = `Please open "Settings" and check if everything is working correctly.`;
const emptyButton = ' Go to settings ';

const Rooms = (props) => {
    const navigate = useNavigate(props);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        props.setFocus();
        fetchRooms();
    }, []);

    const onKeyDownList = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                props.setFocus('menu_rooms');
                break;
        }
    }

    const fetchRooms = async() => {
        const _rooms = await getGroups();
        if (!_rooms || !_rooms.length) {
            setIsLoaded(true);
            setIsEmpty(true);
            props.setFocus();
            return;
        }
        setIsLoaded(true);
        setRooms(_rooms);
        props.setFocus();
    };

    const openSettingsScreen = () => {
        navigate(ROUTES.SETTINGS);
    };

    const renderContent = () => {
        if (isEmpty) {
            return (
                <EmptyState
                    title={emptyTitle}
                    subtitle={emptySubtitle}
                    buttonTitle={emptyButton}
                    onClick={openSettingsScreen}
                />
            );
        }
        return (
            <View style={themeStyles.screen}>
                <View style={styles.titleContainer}>
                    <Text style={themeStyles.textH2}>{screenTitle}</Text>
                </View>
                <List items={rooms} type={'rooms'} />
            </View>
        );
    };

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <LoadingLabel text={loadingTitle}/>
            ) : ( renderContent() )}
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