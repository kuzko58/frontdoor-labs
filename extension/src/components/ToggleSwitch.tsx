import React from 'react';

interface IToggleSwitch {
    value: boolean;
    onChange: (val: boolean) => void;
}

const ToggleSwitch: React.FC<IToggleSwitch> = ({ value, onChange }) => {
    const handleChange = () => {
        const newValue = !value;
        onChange(newValue);
    };

    return (
        <div className="relative inline-block w-10 align-middle select-none">
            <input
                type="checkbox"
                className="absolute top-0 left-0 bottom-0 right-0 z-10 opacity-0"
                checked={value}
                onChange={handleChange}
            />
            <div
                className={`transition-colors duration-200 ease-in-out ${
                    value ? ' bg-violet-500' : 'bg-gray-200'
                } rounded-full w-12 h-6`}
            >
                <div
                    className={`absolute bg-white top-0.5 left-0.5 rounded-lg w-5 h-5 transition-transform duration-200 ease-in-out transform ${
                        value ? 'translate-x-5' : ''
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;
