import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';
import MuiInput from '@mui/material/Input';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import AnimateHeight from "react-animate-height";

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
    focused: boolean,
};

type SwitchButtonProps = {
    focused: boolean,
    children: React.ReactNode
};

const switchHeight = 500;
const switchHeightFocused = 510;
const switchBackground = '#22242b';

const LightDetailsSlider = ({
    id,
    isOn,
    brightnessPercentage,
    color,
    setFocus,
    setBrightnessApi,
    switchOnOffApi,
    focused
}: LightDetailsProps): JSX.Element => {
    const [brightness, setBrightness] = React.useState<number>(brightnessPercentage);
    const [savedBrightness, setSavedBrightness] = React.useState<number>(brightnessPercentage);
    const [isOnState, setIsOnState] = React.useState<boolean>(isOn);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        setFocus(`switch_${id}`);
    }, []);
    const displayBrightness = isOnState ? `${brightness}% Brightness` : 'Turned off';
    const brightnessHeight = isOnState ? (switchHeight * brightness) * 0.01 : 0;
    // const SwitchButton = ({ focused, children }: SwitchButtonProps) => {
    //     const switchBaseHeight = focused ? switchHeightFocused : switchHeight;
    //     const brightnessHeight = isOnState ? (switchBaseHeight * brightness) * 0.01 : 0;
    //     return (
    //         <>{children}</>
    //     );
    // };
    // const FocusableComponent = withFocusable()(SwitchButton);

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
        <>
            {/* <FocusableComponent
                focusKey={`switch_${id}`}
                onArrowPress={onArrow}
                onEnterPress={() => {
                    isOnState ? turnOff() : turnOn();
                    setFocus(`switch_${id}`);
                }}
            /> */}
            <div style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                width: 250,
                height: switchHeight,
            }}>
                <AnimateHeight
                    // height={`${brightness}%`}
                    height={brightnessHeight}
                    delay={200}
                    style={{
                        backgroundColor: `${color}`,
                        borderRadius: 4,
                        width: 250,
                        flexShrink: 0,
                    }}
                >
                </AnimateHeight>
            </div>
        </>
    );
};

export default withFocusable()(LightDetailsSlider);
