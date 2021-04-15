import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

import LightItem from '../Light';

const Room = ({ room, onFocus }) => {
    const { id } = room;

    const Room = ({ room }) => (
        <LightItem isRoom light={room} />
    );
    const FocusableLightRoom = withFocusable()(Room);

    return(
        <FocusableLightRoom
            focusKey={`room_${id}`}
            room={room}
            onBecameFocused={onFocus}
        />
    );
};

export default Room;