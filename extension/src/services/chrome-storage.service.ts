import type { IStore } from '../store/store';
import type { IObjectWithAnyKeys } from '../types/global.type';

type IStorageKey = string | string[];

export const readChromeStorage = (key: IStorageKey): Promise<IObjectWithAnyKeys> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
};

export const getStoreFromChrome = async (): Promise<Partial<IStore>> => {
    const { store } = (await readChromeStorage('store')) as { store: Partial<IStore> };

    return store;
};

export const saveStoreToChrome = (store: Partial<IStore>) => {
    chrome.storage.local.set({
        store,
    });
};
