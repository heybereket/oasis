import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';

import App from './App';
import { init_i18n } from './i18n';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styledHelpers/GlobalStyle';

init_i18n();
ReactDOM.render(
    <React.StrictMode>
        <Reset />
        <GlobalStyle />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
