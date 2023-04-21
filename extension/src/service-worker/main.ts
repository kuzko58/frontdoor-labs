import Bowser from 'bowser';
import { getStoreFromChrome } from '../services/chrome-storage.service';
import { store } from '../store/store';
import { refreshAuth } from './handlers/refresh-auth.handler';
import { onMessage } from './listeners/on-message.listener';

export const main = () => {
    const browser = Bowser.getParser(navigator.userAgent);
    const deviceName = `${browser.getBrowserName()} ${browser.getBrowserVersion()} on ${browser.getOSName()} ${
        browser.getOSVersion() || ''
    }`;
    store.deviceName = deviceName;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        onMessage(store, message, sender, sendResponse);
        return true;
    });

    chrome.runtime.onInstalled.addListener(async () => {
        try {
            const data = await getStoreFromChrome();
            if (data) {
                Object.assign(store, refreshAuth(data));
            }
        } catch (err) {
            console.error(err);
        }
    });
};

main();
