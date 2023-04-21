import { serviceWorkerEvents } from '../../events/service-worker.event';
import {
    IMessageReceiveArgs,
    publishToAllContent,
    sendMessageToContent,
} from '../../services/chrome-messaging.service';
import { getObjectSlice } from '../../util/util';
import { saveStoreToChrome } from '../../services/chrome-storage.service';
import type { IStore } from '../../store/store';
import { contentEvents } from '../../events/content.event';
import { login } from '../handlers/login.handler';
import { register } from '../handlers/register.handler';

export const onMessage = (
    store: IStore,
    ...[message, sender, sendResponse]: IMessageReceiveArgs
) => {
    try {
        switch (message.event) {
            case serviceWorkerEvents.UPDATE_SERVICE_WORKER: {
                Object.assign(store, message.data);

                if (message.options?.persist) {
                    const data = getObjectSlice(store, [
                        'isAuthenticated',
                        'isEnabled',
                    ]) as Partial<IStore>;
                    saveStoreToChrome(data);
                }

                if (message.options?.publish) {
                    publishToAllContent({
                        event: contentEvents.UPDATE_CONTENT_SCRIPTS,
                        data: message.data,
                    });
                }
                sendResponse(true);
                return;
            }

            case serviceWorkerEvents.INITIALIZE_CONTENT_SCRIPT_DATA: {
                const data = getObjectSlice(store, ['isAuthenticated', 'isEnabled']);

                sendResponse(data);
                return;
            }

            case serviceWorkerEvents.INITIALIZE_POP_UP_DATA: {
                const data = getObjectSlice(store, ['isAuthenticated', 'isEnabled']);

                sendResponse(data);
                return;
            }

            case serviceWorkerEvents.LOGIN: {
                if (message.data) {
                    return login(
                        store,
                        { ...message.data, deviceName: store.deviceName },
                        sendResponse,
                    );
                }
                sendResponse(null);
                return;
            }

            case serviceWorkerEvents.REGISTER: {
                if (message.data) {
                    return register(
                        store,
                        { ...message.data, deviceName: store.deviceName },
                        sendResponse,
                    );
                }
                sendResponse(null);
                return;
            }

            default:
                return;
        }
    } catch (err) {
        console.error(err);
        sendResponse(false);
    }
};
