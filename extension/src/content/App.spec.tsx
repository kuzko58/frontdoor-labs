import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
});

// test that useEffect hook is being used
test('calls useEffect', () => {
    jest.spyOn(React, 'useEffect');

    render(<App />);
    expect(React.useEffect).toHaveBeenCalled();
});

// test that chrome runtime message listener is being added and removed
test('adds and removes message listener', () => {
    const addListenerSpy = jest.spyOn(chrome.runtime.onMessage, 'addListener');
    const removeListenerSpy = jest.spyOn(chrome.runtime.onMessage, 'removeListener');

    const { unmount } = render(<App />);
    expect(addListenerSpy).toHaveBeenCalled();

    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
});
