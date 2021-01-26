import React from 'react';
import { useRouter } from 'next/router';
import ScreenLights from '../scenes/Lights';

const Page = () => (
    <ScreenLights router={useRouter()} />
);
export default Page;
