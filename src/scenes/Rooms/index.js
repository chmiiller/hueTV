import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';
import { useNavigate } from '@reach/router';

import { ROUTES, themeStyles } from '../../config';
import { getGroups } from '../../api/hueapi'; // groups are rooms on Hue API terminology
import List from '../List';
import LoadingLabel from '../../components/LoadingLabel';
import EmptyState from '../../components/EmptyState';
import { white } from '../../constants/colors';
import { primaryFont } from '../../constants/text';

const screenTitle = 'All rooms';
const loadingTitle = 'Loading rooms...';
const emptyTitle = 'No rooms found.';
const emptySubtitle = `Please open "Settings" and check if everything is working correctly.`;
const emptyButton = ' Go to settings ';
const CHECK_INTERVAL = 20000;

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

        const countInterval = setInterval(() => {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Checking for rooms`);
            props.setFocus('title');
            fetchRooms();
        }, CHECK_INTERVAL);

        return () => {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> gonna clear interval`);
            clearInterval(countInterval);
        };
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
                    <Text style={styles.title}>{screenTitle}</Text>
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
        marginBottom: getScaledValue(4),
    },
    title: {
        fontFamily: primaryFont,
        fontSize: getScaledValue(20),
        marginVertical: getScaledValue(12),
        color: white,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

export default withFocusable()(Rooms);