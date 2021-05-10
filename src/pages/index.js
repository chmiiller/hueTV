import React from 'react';
import { useRouter } from 'next/router';

import ScreenRooms from '../scenes/Rooms';

const Page = () => (
    <ScreenRooms router={useRouter()} />
);
export default Page;
