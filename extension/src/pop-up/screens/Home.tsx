import React from 'react';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useAppContext } from '../contexts/app-context';
import { updateServiceWorker } from '../handlers/update-service-worker.handler';

const Home = () => {
    const { state, updateState } = useAppContext();

    const toggle = (value: boolean) => {
        updateState({ isEnabled: value });
        updateServiceWorker({ isEnabled: value }, { persist: true, publish: true });
    };

    return (
        <div>
            <div className="flex gap-12 justify-center items-center mt-4">
                <span className="text-lg text-gray-700 font-bold">
                    {state.isEnabled ? 'ON' : 'OFF'}
                </span>
                <ToggleSwitch value={state.isEnabled} onChange={toggle} />
            </div>
        </div>
    );
};

export default Home;
