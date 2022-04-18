import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { useNavigate, useLocation } from 'react-router-dom';

import Light from '../components/Light';
import useInterval from '../api/useInterval';
import { getGroups } from '../api/hueapi';
import { type Room } from '../api/types';

type FocusedProps = {
    node: HTMLElement,
};

type HomeProps = {
    setFocus: (item?: any) => void,
};

const API_DELAY = 2000;

const Home = ({ setFocus }:HomeProps ): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleScrolling = ({ node }: FocusedProps) => {
        node.scrollIntoView({ behavior: "smooth", block: 'center' });
    };

    const [rooms, setRooms] = React.useState<Array<Room>>([]);
    
    React.useEffect(() => {
        homeGetGroups();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.addEventListener('tizenhwkey', onKey); // No event type for Tizen events =/
        window.addEventListener('keydown', onKey);
        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.removeEventListener('tizenhwkey', onKey); // No event type for Tizen events =/
            window.removeEventListener('keydown', onKey);
        };
    }, []);

    React.useEffect(() => {
        if (location.state === 'focus'){
            setTimeout(() => {
                setFocus();
            }, 100);
        }
    }, [location.state]);

    useInterval(() => {
        homeGetGroups();
    }, API_DELAY);

    const onKey = (event: KeyboardEvent) => {
        if (event.keyCode === 10009 || event.keyCode === 8 || event.keyCode === 27) {
            // back button
            setFocus('menu_home_screen');
        }
    };

    const homeGetGroups = async () => {
        const _rooms = await getGroups();
        if (_rooms !== null) {
            setRooms(_rooms);
        }
    };

    return (
        <div style={{padding: 100}}>
            <Fade in timeout={600}>
                <Box sx={{ display: 'grid', rowGap: 5, gridTemplateColumns: 'repeat(3, 1fr)' }}>   
                    {rooms.map((room: Room) => (
                        <Light
                            key={room.id}
                            focusKey={`room_${room.id}`}
                            name={room.name}
                            brightness={room.brightPercentage}
                            color={room.color}
                            isOn={room.allOn || room.anyOn}
                            onBecameFocused={handleScrolling}
                            onEnterPress={() => {
                                navigate('/room', { state: { id: room.id } });
                            }}
                        />
                    ))}
                </Box>
            </Fade>
        </div>
    );
};

export default withFocusable()(Home);
