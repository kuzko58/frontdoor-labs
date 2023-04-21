import { serviceWorkerEvents } from '../../events/service-worker.event';
import { sendMessageToWorker } from '../../services/chrome-messaging.service';
import type { IUserRegister } from '../../types/global.type';

export const initiateRegister = (data: IUserRegister) =>
    new Promise((resolve) => {
        sendMessageToWorker({ event: serviceWorkerEvents.REGISTER, data }, (data) => {
            resolve(data);
        });
    });
