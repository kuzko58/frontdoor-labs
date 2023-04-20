import React, { useEffect } from 'react';
import { onMessage } from './listeners/on-message.listener';
import './App.css';
import { IMessageReceiveArgs } from '../services/chrome-messaging.service';
import { useAppContext } from './contexts/app-context';

const App = () => {
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

    return <></>;
};

export default App;
