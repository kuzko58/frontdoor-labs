import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { IMessageReceiveArgs } from '../services/chrome-messaging.service';
import AuthGuard from './components/AuthGuard';
import { useAppContext } from './contexts/app-context';
import { onMessage } from './listeners/on-message.listener';
import Home from './screens/Home';
import LoginForm from './screens/Login';
import RegistrationForm from './screens/RegisterForm';

function App() {
    const context = useAppContext();

    useEffect(() => {
        const messageLiistener = (...[message, sender, sendResponse]: IMessageReceiveArgs) => {
            onMessage(context, message, sender, sendResponse);
        };
        chrome.runtime.onMessage.addListener(messageLiistener);

        return () => {
            chrome.runtime.onMessage.removeListener(messageLiistener);
        };
    }, [context]);

    return (
        <div className="p-5 min-w-[300px] min-h-[400px]">
            <h1 className="text-lg font-bold mb-4 text-violet-600">Frontdoor Labs</h1>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route element={<AuthGuard />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
