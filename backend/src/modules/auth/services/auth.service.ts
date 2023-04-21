import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../user/repositories/user.repository.js';
import { UserService } from '../../user/services/user.service.js';
import { ILoginDTO, IRefreshTokenDTO, ISignUpDTO, IUserAuthData } from '../types/auth.type.js';
import { UserLoginService } from './user-login.service.js';

@Injectable()
export class AuthService {
  constructor(
    private rUser: UserRepository,
    private userService: UserService,
    private userLoginService: UserLoginService,
    private jwtService: JwtService,
  ) {}

  async signup(payload: ISignUpDTO): Promise<IUserAuthData> {
    const user = await this.userService.createUser({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 8),
    });
    const tokenData = await this.userLoginService.login(user._id, payload);

    return { user, ...tokenData };
  }

  async login(payload: ILoginDTO): Promise<IUserAuthData> {
    const user = await this.rUser.db.findOne({ email: payload.email }).select('+password');

    if (!user || !bcrypt.compareSync(payload.password, user?.password as string)) {
      throw new UnauthorizedException('email or password incorrect');
    }

    user.password = undefined;
    const tokenData = await this.userLoginService.login(user._id, payload);

    return { user, ...tokenData };
  }

  async refreshToken(payload: IRefreshTokenDTO): Promise<IUserAuthData> {
    const { sub: userId } = await this.jwtService
      .verifyAsync(payload.accessToken, { ignoreExpiration: true })
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException('Invalid access token');
      });
    const user = await this.rUser.db.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokenData = await this.userLoginService.refresh(user._id, payload.refreshToken);

    return { user, ...tokenData };
  }
}
