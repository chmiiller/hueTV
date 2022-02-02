import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

type LightDetailsProps = {
    id: string,
    isOn: boolean,
    brightnessPercentage: number,
    color: string,
    setFocus: (item?: any) => void,
    setBrightnessApi: (brightness: number) => void,
    switchOnOffApi: (turnOn: boolean) => void,
};

type SwitchButtonProps = {
    focused: boolean
};

const switchHeight = 500;
const switchHeightFocused = 510;
const switchBackground = '#22242b';

const LightDetails = ({
    id,
    isOn,
    brightnessPercentage,
    color,
    setFocus,
    setBrightnessApi,
    switchOnOffApi
}: LightDetailsProps): JSX.Element => {
    const [brightness, setBrightness] = React.useState<number>(brightnessPercentage);
    const [savedBrightness, setSavedBrightness] = React.useState<number>(brightnessPercentage);
    const [isOnState, setIsOnState] = React.useState<boolean>(isOn);
    
    React.useEffect(() => {
        setFocus(`switch_${id}`);
    }, []);
    
    const SwitchButton = ({ focused }: SwitchButtonProps) => {
        const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
        const brightnessHeight = isOnState ? (switchBaseHeight * brightness) * 0.01 : 0;
        const displayBrightness = isOnState ? `${brightness}% Brightness` : 'Turned off';
        return (
            <>
                <Typography sx={{ marginTop: 1 }} gutterBottom variant={'h6'}>{displayBrightness}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    bgcolor: switchBackground,
                    border: focused ? 1 : 0,
                    boxShadow: focused ? 12 : 0,
                    borderColor: '#3f444a',
                    borderRadius: 4,
                    width: 250,
                    height: switchHeight,
                    margin: 4,
                }}>
                    <Box sx={{
                        display: 'flex',
                        bgcolor: `${color}`,
                        borderRadius: 4,
                        width: 250,
                        height: brightnessHeight,
                    }} />
                    <Box sx={{
                        display: 'flex',
                        width: 250,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        position: "absolute",
                        height: 100,
                    }}>
                        {isOnState
                            ? <LightbulbIcon sx={{fontSize: 60, marginBottom: 2}} />
                            : <LightbulbOutlinedIcon sx={{fontSize: 60, marginBottom: 2}} />
                        }
                    </Box>
                </Box>
            </>
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);

    const makeBrighter = () => {
        switchOnOffApi(true);
        setIsOnState(true);
        const newBrightness = brightness + 10;
        if (newBrightness < 100) {
            setBrightnessApi(newBrightness);
            setBrightness(newBrightness);
        } else {
            setBrightnessApi(100);
            setBrightness(100);
        }
        setFocus(`switch_${id}`);
    };
    
    const makeDarker = () => {
        const newBrightness = brightness - 10;
        if (newBrightness > 0) {
            setBrightnessApi(newBrightness);
            setBrightness(newBrightness);
        } else {
            turnOff();
        }
        setFocus(`switch_${id}`);
    };

    const turnOff = () => {
        setSavedBrightness(brightness);
        setBrightness(0);
        setIsOnState(false);
        switchOnOffApi(false);
    };
    
    const turnOn = () => {
        setBrightness(savedBrightness);
        setIsOnState(true);
        switchOnOffApi(true);
    };

    const onArrow = (direction: string) => {
        switch (direction) {
        case 'up':
            makeBrighter();
            break;
            
        case 'down':
            makeDarker();
            break;
        }
    };
    return (
        <FocusableComponent
            focusKey={`switch_${id}`}
            onArrowPress={onArrow}
            onEnterPress={() => {
                isOnState ? turnOff() : turnOn();
                setFocus(`switch_${id}`);
            }}
        />
    );
};

export default withFocusable()(LightDetails);
