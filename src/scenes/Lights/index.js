import React,{ useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { getScaledValue, StyleSheet } from 'renative';
import { useNavigate } from '@reach/router';

import { groupLights, ROUTES, themeStyles } from '../../config';
import { getLights, getGroupsWithLights } from '../../api/hueapi';

import List from '../List';
import Grouped from '../List/Grouped';
import LoadingLabel from '../../components/LoadingLabel';
import EmptyState from '../../components/EmptyState';

const screenTitle = 'All lights';
const loadingTitle = 'Loading lights...';
const emptyTitle = 'No lights found.';
const emptySubtitle = `Please open "Settings" and check if everything is working correctly.`;
const emptyButton = ' Go to settings ';
const CHECK_INTERVAL = 20000;

const Lights = (props) => {
    const navigate = useNavigate(props);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lights, setLights] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('keydown', onKeyDownList);
        }, 100);
        props.setFocus();
        fetchLights();

        const countInterval = setInterval(() => {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Checking for lights`);
            props.setFocus('title');
            fetchLights();
        }, CHECK_INTERVAL);

        return () => {
            console.log(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> gonna clear lights interval`);
            clearInterval(countInterval);
        };
    }, []);

    const onKeyDownList = (event) => {
        switch (event.keyCode) {
            case 8: //backspace
            case 10009:
                props.setFocus('menu_lights');
                break;
        }
    }

    const fetchLights = async() => {
        const _lights = groupLights ? await getGroupsWithLights() : await getLights();
        if (!_lights || !_lights.length) {
            setIsLoaded(true);
            setIsEmpty(true);
            props.setFocus();
            return;
        }
        setIsLoaded(true);
        setLights(_lights);
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
                {groupLights ? (
                    <Grouped items={lights} />
                ) : (
                    <List items={lights} type={'lights'} />
                )}
            </View>
        );
    };

    return (
        <View style={themeStyles.screen}>
            { !isLoaded ? (
                <LoadingLabel text={loadingTitle} />
            ) : renderContent()}
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