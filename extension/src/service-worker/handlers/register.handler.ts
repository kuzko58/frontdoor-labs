import { post } from '../../queries/auth.query';
import type { ISendMessageCallback } from '../../services/chrome-messaging.service';
import type { IStore } from '../../store/store';
import type { IObjectWithAnyKeys } from '../../types/global.type';
import { updateAuth } from './update-auth.handler';

export const register = async (
    store: IStore,
    data: IObjectWithAnyKeys,
    sendResponse: ISendMessageCallback,
) => {
    const response = await post('auth/signup', data);

    if (response.data) {
        updateAuth(store, response.data, sendResponse);
    } else {
        sendResponse(null);
    }
};
