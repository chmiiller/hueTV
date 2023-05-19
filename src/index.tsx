import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';

import FocusableApp from './App';

initNavigation();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <FocusableApp />
        </BrowserRouter>
    </React.StrictMode>
);
