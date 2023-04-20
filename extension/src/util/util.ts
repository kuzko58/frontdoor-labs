import type { IObjectWithAnyKeys } from '../types/global.type';

export const getObjectSlice = (obj: IObjectWithAnyKeys, keys: string[]) => {
    let result: IObjectWithAnyKeys | null = null;

    if (keys.length) {
        result = {};
        for (const key of keys) {
            if (obj[key] !== 'undefined') {
                result[key] = obj[key];
            }
        }
    }

    return result;
};
