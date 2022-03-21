import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type LightProps = {
    name?: string,
    brightness: number,
    color?: string,
    isOn: boolean,
    focused: boolean,
};

const switchBackground = '#22242b';
const switchSize = 250;

const STR_BRIGHTNESS = 'Brightness';
const STR_TURNED_OFF = 'Turned off';

const Light = ({
    name,
    brightness,
    color,
    isOn,
    focused,
}: LightProps): JSX.Element => {
    const brightnessHeight = (switchSize * brightness) * 0.01;
    const displayBrightness = isOn ? `${brightness}% ${STR_BRIGHTNESS}` : STR_TURNED_OFF;

    const dynamicStyle = {
        display: 'flex',
        bgcolor: isOn ? color : 'transparent',
        borderRadius: 4,
        width: switchSize,
        height: brightnessHeight,
        transition: '250ms',
    };

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
                // transition: '150ms',
                // transform: 'translateX(-25%) translateY(-25%)',
            }}>
                <Box sx={dynamicStyle} />
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

export default withFocusable()(Light);
