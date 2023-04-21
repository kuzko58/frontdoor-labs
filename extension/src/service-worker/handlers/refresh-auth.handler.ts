import { post } from '../../queries/auth.query';
import type { ISendMessageCallback } from '../../services/chrome-messaging.service';
import type { IStore } from '../../store/store';
import { getObjectSlice } from '../../util/util';
import { updateAuth } from './update-auth.handler';

export const refreshAuth = async (store: Partial<IStore>) => {
    const data = getObjectSlice(store, ['accessToken', 'refreshToken']);
    if (data && data.accessToken && data.refreshToken) {
        const response = await post('auth/refresh-token', data);
        if (response.data) {
            updateAuth(store, response.data);
            return store;
        }
    }
    return null;
};
