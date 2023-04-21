import { serviceWorkerEvents } from '../../events/service-worker.event';
import { IMessageOptions, sendMessageToWorker } from '../../services/chrome-messaging.service';
import type { IAppState } from '../contexts/app-context';

export const updateServiceWorker = (data: Partial<IAppState>, options?: IMessageOptions) => {
    sendMessageToWorker(
        { event: serviceWorkerEvents.UPDATE_SERVICE_WORKER, data, options },
        (resp) => {},
    );
};
