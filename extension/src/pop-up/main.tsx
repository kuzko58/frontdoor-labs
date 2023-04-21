import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppProvider } from './contexts/app-context';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppProvider>
            <Router initialEntries={['/']}>
                <App />
            </Router>
        </AppProvider>
    </React.StrictMode>,
);
