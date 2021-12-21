import React from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Light } from '../api/types';
import LightDetails from '../components/LightDetails';
import {
    getLightById,
    setLightBrightness,
    turnLightOn,
    turnLightOff,
} from '../api/hueapi';

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
    return (
        <div style={{padding: 100}}>
            { light &&
                <>
                    <h3>{`${light.name}`}</h3>
                    <LightDetails
                        id={light.id}
                        isOn={light.isOn}
                        brightnessPercentage={light.brightPercentage}
                        setBrightnessApi={setBrightness}
                        switchOnOffApi={switchOnOff}
                    />
                </>
            }
        </div>
    );
};

export default LightDetailsScreen;
