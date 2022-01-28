import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Light } from '../api/types';
import useInterval from '../api/useInterval';
import LightDetails from '../components/LightDetails';
import {
    getLightById,
    setLightBrightness,
    turnLightOn,
    turnLightOff,
} from '../api/hueapi';

const tutorial_message1 = 'Arrows Up / Down: Brightness';
const tutorial_message2 = 'Select Button: On / Off';
const API_DELAY = 3000;

const LightDetailsScreen = (): JSX.Element => {
    const { state } = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchLight();
    }, [state.id]);

    // Window keys listener => back button
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('tizenhwkey', onKey); // No event type for Tizen events =/
        window.addEventListener('keydown', onKey);
    }, []);

    const onKey = (event: KeyboardEvent) => {
        if (event.keyCode === 10009 || event.keyCode === 8 || event.keyCode === 27) {
            // back button
            navigate('/lights');
        }
    };

    const [light, setLight] = React.useState<Light>();

    useInterval(() => {
        fetchLight();
    }, API_DELAY);

    const setBrightness = async(brightness: number) => {
        await setLightBrightness({ id: state.id, percentage: brightness});
    };
    
    const switchOnOff = async(turnOn: boolean) => {
        turnOn ? await turnLightOn(state.id) :  await turnLightOff(state.id);
    };

    const fetchLight = async() => {
        const _light = await getLightById(state.id);
        if (_light) {
            setLight(_light);
        }
    };

    if (light) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12
            }}>
                <Typography variant={'h3'}>{`${light.name}`}</Typography>
                <LightDetails
                    id={light.id}
                    isOn={light.isOn}
                    brightnessPercentage={light.brightPercentage}
                    color={light.color}
                    setBrightnessApi={setBrightness}
                    switchOnOffApi={switchOnOff}
                />
                <Typography sx={{ opacity: 0.75 }} gutterBottom variant={'subtitle2'}>{tutorial_message1}</Typography>
                <Typography sx={{ opacity: 0.75 }} gutterBottom variant={'subtitle2'}>{tutorial_message2}</Typography>
            </Box>
        );
    } else {
        return (
            <h3>Loading...</h3>
        );
    }
};

export default LightDetailsScreen;
