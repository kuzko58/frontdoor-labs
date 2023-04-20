import * as React from 'react';
import { serviceWorkerEvents } from '../../events/service-worker.event';
import { sendMessageToWorker } from '../../services/chrome-messaging.service';

const initialState = {
    isAuthenticated: false,
    isEnabled: false,
    summary: '',
    highlightedText: '',
};

export type IAppState = typeof initialState;

export type IUpdateState = (update: Partial<IAppState>) => void;

const updater: IUpdateState = (update) => {};

const context = {
    state: initialState,
    updateState: updater,
    resetState: () => {},
};

export type IAppContext = typeof context;

const AppContext = React.createContext<IAppContext>(context);

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, setState] = React.useState(initialState);

    const updateState: IUpdateState = (update) => {
        setState((prev) => ({
            ...prev,
            ...update,
        }));
    };

    const resetState = () => {
        setState(initialState);
    };
    React.useEffect(() => {
        sendMessageToWorker(
            { event: serviceWorkerEvents.INITIALIZE_CONTENT_SCRIPT_DATA },
            (data: Partial<IAppState>) => {
                console.log('updated', data);
                updateState(data);
            },
        );
    }, []);

    return (
        <AppContext.Provider value={{ state, updateState, resetState }}>
            {children}
        </AppContext.Provider>
    );
};

export const AppConsumer = AppContext.Consumer;

export const useAppContext = () => {
    return React.useContext(AppContext);
};
