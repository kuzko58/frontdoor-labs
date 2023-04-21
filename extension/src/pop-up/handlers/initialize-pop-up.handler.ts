import { serviceWorkerEvents } from '../../events/service-worker.event';
import { sendMessageToWorker } from '../../services/chrome-messaging.service';
import type { IAppState, IUpdateState } from '../contexts/app-context';

export const initializePopUp = (callback: IUpdateState) => {
    sendMessageToWorker(
        { event: serviceWorkerEvents.INITIALIZE_POP_UP_DATA },
        (data: Partial<IAppState>) => {
            callback(data);
        },
    );
};
