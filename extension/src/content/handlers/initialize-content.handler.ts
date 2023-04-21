import { serviceWorkerEvents } from '../../events/service-worker.event';
import { sendMessageToWorker } from '../../services/chrome-messaging.service';
import type { IAppState } from '../contexts/app-context';

type ICallback = (data: Partial<IAppState>) => void;

export const initializeContent = (callback: ICallback) => {
    sendMessageToWorker(
        { event: serviceWorkerEvents.INITIALIZE_CONTENT_SCRIPT_DATA },
        (data: Partial<IAppState>) => {
            callback(data);
        },
    );
};
