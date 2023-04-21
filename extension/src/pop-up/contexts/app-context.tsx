import * as React from 'react';
import { initializePopUp } from '../handlers/initialize-pop-up.handler';

const initialState = {
    isAuthenticated: true,
    isEnabled: false,
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
        initializePopUp(updateState);
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
