export const store = {
    isAuthenticated: false,
    isEnabled: false,
    deviceName: '',
    accessToken: '',
    refreshToken: '',
    user: {
        firstName: '',
        lastName: '',
        email: '',
        __v: 0,
    },
};

export type IStore = typeof store;
