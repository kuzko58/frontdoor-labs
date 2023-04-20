import { serviceWorkerEvents } from '../../events/service-worker.event';
import { IMessageReceiveArgs, sendMessageToContent } from '../../services/chrome-messaging.service';
import { getObjectSlice } from '../../util/util';
import type { IStore } from '../../store/store';

export const onMessage = (
    store: IStore,
    ...[message, sender, sendResponse]: IMessageReceiveArgs
) => {
    switch (message.event) {
        case serviceWorkerEvents.UPDATE_SERVICE_WORKER: {
        }
        case serviceWorkerEvents.INITIALIZE_CONTENT_SCRIPT_DATA: {
            const data = getObjectSlice(store, ['isAuthenticated', 'isEnabled']);

            sendResponse(data);
        }
        default:
            return;
    }
};
