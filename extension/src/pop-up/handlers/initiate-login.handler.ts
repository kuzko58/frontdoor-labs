import { serviceWorkerEvents } from '../../events/service-worker.event';
import { sendMessageToWorker } from '../../services/chrome-messaging.service';
import type { IUserLogin } from '../../types/global.type';

export const initiateLogin = (data: IUserLogin) =>
    new Promise((resolve) => {
        sendMessageToWorker({ event: serviceWorkerEvents.LOGIN, data }, (data) => {
            resolve(data);
        });
    });
