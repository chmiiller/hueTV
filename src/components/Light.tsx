import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type FocusedProps = {
    node: HTMLElement,
};

type LightProps = {
    id: string,
    onFocus: ({ node }: FocusedProps) => void,
    name?: string,
    brightness: number,
    color?: string,
    isGroup: boolean,
    isOn: boolean
};

type SwitchButtonProps = {
    focused: boolean
};

const switchBackground = '#22242b';
const switchSize = 250;
const Light = ({ id, onFocus, name, brightness, color, isGroup, isOn }: LightProps): JSX.Element => {
    const navigate = useNavigate();
    // const [stateOn, setStateOn] = React.useState(isOn);
    const brightnessHeight = (switchSize * brightness) * 0.01;
    const displayBrightness = isOn ? `${brightness}% Brightness` : 'Turned off';

    const SwitchButton = ({ focused }: SwitchButtonProps) => {
        return (
            <div>
                <Typography sx={{ marginLeft: 1 }} gutterBottom variant={'h5'}>{name}</Typography>
                <Typography sx={{ marginLeft: 1 }} gutterBottom variant={'subtitle1'}>{displayBrightness}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    bgcolor: switchBackground,
                    border: focused ? 1 : 0,
                    boxShadow: focused ? 12 : 0,
                    borderColor: '#3f444a',
                    borderRadius: 4,
                    width: switchSize,
                    height: switchSize,
                    marginTop: 4,
                }}>
                    <Box sx={{
                        display: 'flex',
                        bgcolor: isOn ? color?.toString() : 'transparent',
                        borderRadius: 4,
                        width: switchSize,
                        height: brightnessHeight,
                    }} />
                    <Box sx={{
                        width: switchSize,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        height: 100,
                    }} />
                </Box>
            </div>
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);

    return (
        <FocusableComponent
            focusKey={`light_${id}`}
            onBecameFocused={onFocus}
            onEnterPress={() => {
                isGroup ? navigate('/room', { state: { id } }) : navigate('/light', { state: { id } });
            }}
        />
    );
};

export default Light;
