import React from 'react';
import ReactDOM from 'react-dom/client';
import uniqid from 'uniqid';
import { AppProvider } from './contexts/app-context';

import App from './App';

const rootElement = document.createElement('div');
rootElement.id = uniqid();
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>,
);
