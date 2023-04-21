import React, { useEffect } from 'react';
import { onMessage } from './listeners/on-message.listener';
import './App.css';
import { IMessageReceiveArgs } from '../services/chrome-messaging.service';
import { useAppContext } from './contexts/app-context';
import { onTextSelect } from './handlers/on-text-select.handler';

const App = () => {
    const context = useAppContext();

    useEffect(() => {
        const messageLiistener = (...[message, sender, sendResponse]: IMessageReceiveArgs) => {
            onMessage(context, message, sender, sendResponse);
        };
        chrome.runtime.onMessage.addListener(messageLiistener);

        if (context.state.isEnabled) {
            document.addEventListener('mouseup', onTextSelect);
        }

        return () => {
            chrome.runtime.onMessage.removeListener(messageLiistener);
            document.removeEventListener('mouseup', onTextSelect);
        };
    }, [context]);

    return <></>;
};

export default App;
