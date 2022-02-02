import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';

import { type Room } from '../api/types';
import LightDetails from '../components/LightDetails';
import {
    getGroupById,
    setGroupBrightness,
    turnGroupOn,
    turnGroupOff,
} from '../api/hueapi';

const tutorial_message1 = 'Arrows Up / Down: Brightness';
const tutorial_message2 = 'Select Button: On / Off';

const RoomDetails = (): JSX.Element => {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        fetchRoom();
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
            navigate('/home');
        }
    };

    const [room, setRoom] = React.useState<Room>();

    const setRoomBrightness = async(brightness: number) => {
        await setGroupBrightness({ id: state.id, percentage: brightness});
    };
    
    const switchOnOff = async(turnOn: boolean) => {
        turnOn ? await turnGroupOn(state.id) :  await turnGroupOff(state.id);
    };

    const fetchRoom = async() => {
        const _group = await getGroupById(state.id); // Groups are rooms on Philips Hue universe
        if (_group) {
            setRoom(_group);
        }
    };

    if (room) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12
            }}>
                <Typography variant={'h3'}>{`${room.name}`}</Typography>
                <LightDetails
                    id={room.id}
                    isOn={room.allOn || room.anyOn}
                    brightnessPercentage={room.brightPercentage}
                    color={room.color}
                    setBrightnessApi={setRoomBrightness}
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

export default RoomDetails;
