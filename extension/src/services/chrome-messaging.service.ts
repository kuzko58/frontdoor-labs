import type { IObjectWithAnyKeys } from '../types/global.type';

export interface IMessage {
    event: string;
    data?: IObjectWithAnyKeys;
    persist?: boolean;
}

export type ISendMessageCallback = (data: any) => void;

export type IMessageReceiveArgs = [
    message: IMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: ISendMessageCallback,
];

export const sendMessageToWorker = (message: IMessage, callback?: ISendMessageCallback) => {
    if (callback) {
        chrome.runtime.sendMessage(message, callback);
    } else {
        chrome.runtime.sendMessage(message);
    }
};

export const sendMessageToContent = (
    tabId: number,
    message: IMessage,
    callback?: ISendMessageCallback,
) => {
    if (callback) {
        chrome.tabs.sendMessage(tabId, message, callback);
    } else {
        chrome.tabs.sendMessage(tabId, message);
    }
};
