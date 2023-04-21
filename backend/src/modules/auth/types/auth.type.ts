import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { REQ_CTX } from '../../../config/constants.js';
import { ICreateUserDTO, IUser } from '../../user/types/user.type.js';
import { IUserLoginDTO } from './user-login.type.js';

export interface IRequestCtx {
  jwt: JwtPayload;
  user: IUser;
}

export interface IAppRequest extends Request {
  [REQ_CTX]: IRequestCtx;
}

export interface ILoginDTO extends IUserLoginDTO {
  email: string;
  password: string;
}

export interface ISignUpDTO extends ICreateUserDTO, IUserLoginDTO {}

export interface IUserAuthData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenDTO {
  refreshToken: string;
  accessToken: string;
}
