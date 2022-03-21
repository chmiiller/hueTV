import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { useNavigate } from 'react-router-dom';

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
    const handleScrolling = ({ node }: FocusedProps) => {
        node.scrollIntoView({ behavior: "smooth", block: 'center' });
    };

    const [rooms, setRooms] = React.useState<Array<Room>>([]);
    React.useEffect(() => {
        homeGetGroups();
        setFocus('menu_item_root');
    }, []);

    useInterval(() => {
        homeGetGroups();
    }, API_DELAY);

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
                            id={room.id}
                            name={room.name}
                            brightness={room.brightPercentage}
                            color={room.color}
                            onFocus={handleScrolling}
                            isGroup
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
