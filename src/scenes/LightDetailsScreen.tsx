import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Light } from '../api/types';
import LightDetails from '../components/LightDetails';
import LightDetailsAnimated from '../components/LightDetailsAnimated';
import {
    getLightById,
    setLightBrightness,
    turnLightOn,
    turnLightOff,
} from '../api/hueapi';

const tutorial_message1 = 'Arrows Up / Down: Brightness';
const tutorial_message2 = 'Select Button: On / Off';

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
    const [visualBrightness, setVisualBrightness] = React.useState<number>(0);

    const setBrightness = async(brightness: number) => {
        await setLightBrightness({ id: state.id, percentage: brightness});
    };
    
    const switchOnOff = async(turnOn: boolean) => {
        turnOn ? await turnLightOn(state.id) :  await turnLightOff(state.id);
    };

    const fetchLight = async() => {
        const _light = await getLightById(state.id);
        if (_light) {
            setVisualBrightness(_light.brightPercentage);
            setLight(_light);
        }
    };

    const onArrow = (direction: string) => {
        switch (direction) {
        case 'up':
            setVisualBrightness(visualBrightness + 10);
            break;
            
        case 'down':
            setVisualBrightness(visualBrightness - 10);
            break;
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
                <LightDetailsAnimated
                    focusKey={`switch_${light.id}`}
                    id={light.id}
                    isOn={light.isOn}
                    // brightnessPercentage={light.brightPercentage}
                    brightnessPercentage={visualBrightness}
                    color={light.color}
                    setBrightnessApi={setBrightness}
                    switchOnOffApi={switchOnOff}
                    onArrowPress={onArrow}
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
