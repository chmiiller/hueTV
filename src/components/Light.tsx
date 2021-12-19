import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';

import {
    turnLightOff,
    turnLightOn,
    turnGroupOff,
    turnGroupOn
} from '../api/hueapi';

type FocusedProps = {
    node: HTMLElement,
};

type LightProps = {
    id: string,
    onFocus: ({ node }: FocusedProps) => void,
    name?: string,
    brightness?: number,
    isGroup: boolean,
    isOn: boolean
};

type SwitchButtonProps = {
    focused: boolean
};

const Light = ({ id, onFocus, name, brightness, isGroup, isOn }: LightProps): JSX.Element => {
    const [stateOn, setStateOn] = React.useState(isOn);
    const SwitchButton = ({ focused }: SwitchButtonProps) => {
        return (
            <Box
                sx={{
                    bgcolor: stateOn ? 'primary.main' : 'background.paper',
                    border: focused ? 2 : 0,
                    borderColor: 'white',
                    borderRadius: 2,
                    width: 250,
                    height: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h2>{name}</h2>
                <h3>{`${brightness}%`}</h3>
            </Box>
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);

    return (
        <FocusableComponent
            focusKey={`light_${id}`}
            onBecameFocused={onFocus}
            onEnterPress={() => {
                if (isGroup) {
                    if (stateOn) {
                        setStateOn(false);
                        turnGroupOff(id);
                    } else {
                        setStateOn(true);
                        turnGroupOn(id);
                    }
                } else {
                    if (stateOn) {
                        setStateOn(false);
                        turnLightOff(id);
                    } else {
                        setStateOn(true);
                        turnLightOn(id);
                    }                    
                }
            }}
        />
    );
};

export default Light;
