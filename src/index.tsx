import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';

import FocusableApp from './App';

initNavigation();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <FocusableApp />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
