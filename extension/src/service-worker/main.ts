import { store } from '../store/store';
import { onMessage } from './listeners/on-message.listener';

export const main = () => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        onMessage(store, message, sender, sendResponse);
    });
};

main();
