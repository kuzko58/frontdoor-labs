import { contentEvents } from '../../events/content.event';
import { ISendMessageCallback, publishToAllContent } from '../../services/chrome-messaging.service';
import { getObjectSlice } from '../../util/util';
import type { IStore } from '../../store/store';
import type { IAuthResponse } from '../../types/global.type';
import { saveStoreToChrome } from '../../services/chrome-storage.service';

export const updateAuth = (
    store: Partial<IStore>,
    update: IAuthResponse['data'],
    sendResponse?: ISendMessageCallback,
) => {
    Object.assign(store, { isAuthenticated: true, ...update });
    const data = getObjectSlice(store, ['isAuthenticated']) as Partial<IStore>;

    saveStoreToChrome(data);
    if (sendResponse) {
        sendResponse(data);
    }

    publishToAllContent({
        event: contentEvents.UPDATE_CONTENT_SCRIPTS,
        data,
    });
};
