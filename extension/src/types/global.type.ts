export interface IObjectWithAnyKeys {
    [key: string]: any;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IAuthUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    __v: number;
}

export interface IAuthResponse {
    success: boolean;
    message: string;
    data: {
        user: IAuthUser;
        accessToken: string;
        refreshToken: string;
    };
}
