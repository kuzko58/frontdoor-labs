import ky from 'ky';
import { apiUrl } from '../config/base-url';
import type { IAuthResponse, IObjectWithAnyKeys } from '../types/global.type';

export const post = async (endpoint: string, payload: IObjectWithAnyKeys) => {
    const json = await ky.post(`${apiUrl}/${endpoint}`, { json: payload }).json<IAuthResponse>();

    return json;
};
