import { contentEvents } from '../../events/content.event';
import { IMessageReceiveArgs } from '../../services/chrome-messaging.service';
import type { IAppContext } from '../contexts/app-context';

export const onMessage = (
    context: IAppContext,
    ...[message, sender, sendResponse]: IMessageReceiveArgs
) => {
    switch (message.event) {
        case contentEvents.UPDATE_CONTENT_SCRIPTS: {
        }
        default:
            return;
    }
};
