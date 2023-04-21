import { popUpEvents } from '../../events/pop-up.events';
import { IMessageReceiveArgs } from '../../services/chrome-messaging.service';
import type { IAppContext } from '../contexts/app-context';

export const onMessage = (
    context: IAppContext,
    ...[message, sender, sendResponse]: IMessageReceiveArgs
) => {
    switch (message.event) {
        case popUpEvents.UPDATE_POP_UP: {
        }
        default:
            return;
    }
};
