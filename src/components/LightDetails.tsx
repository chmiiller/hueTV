import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';

type LightDetailsProps = {
    id: string,
    isOn: boolean,
    brightnessPercentage: number,
    setFocus: (item: any) => void,
    setBrightnessApi: (brightness: number) => void,
    switchOnOffApi: (turnOn: boolean) => void,
};

type SwitchButtonProps = {
    focused: boolean
};

const switchHeight = 500;
const switchHeightFocused = 510;
const switchBackground1 = '#22242b';
// const switchBackground2 = '#16171c';

const LightDetails = ({ id, isOn, brightnessPercentage, setFocus, setBrightnessApi, switchOnOffApi }: LightDetailsProps): JSX.Element => {
    const [brightness, setBrightness] = React.useState<number>(brightnessPercentage);
    const [savedBrightness, setSavedBrightness] = React.useState<number>(brightnessPercentage);
    const [isOnState, setIsOnState] = React.useState<boolean>(isOn);
    
    React.useEffect(() => {
        setFocus(`switch_${id}`);
    }, []);
    
    const SwitchButton = ({ focused }: SwitchButtonProps) => {
        // const containerLight = focused ? styles.containerLightFocused : styles.containerLight;
        // const containerBg = focused ? styles.containerBgFocused : styles.containerBg;
        const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
        const brightnessHeight = (switchBaseHeight * brightness) * 0.01;
        // const borderTop = brightness >= 93 ? 15 : 0;
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    bgcolor: switchBackground1,
                    border: focused ? 1 : 0,
                    boxShadow: focused ? 12 : 0,
                    borderColor: '#3f444a',
                    borderRadius: 5,
                    width: 250,
                    height: 500,
                    margin: 4,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        bgcolor: 'primary.main',
                        borderRadius: 5,
                        width: 250,
                        height: brightnessHeight,
                    }}
                />
                <div>
                    <div>Icon</div>
                </div>
            </Box>
        );
    };
    const FocusableComponent = withFocusable()(SwitchButton);

    const makeBrighter = () => {
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
        // setBrightnessApi(brightness);
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
            
        case 'left':
            // back to menu
            // setFocus('menu_rooms');
            break;
        
        default:
            // back to menu
            // setFocus('menu_rooms');
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
