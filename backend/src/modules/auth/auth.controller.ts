import { Controller, HttpCode, HttpStatus, Ip, Post } from '@nestjs/common';
import { successResponse } from '../../common/response/success-response.js';
import { JoiBody } from '../common/decorators/joi-body.decorator.js';
import { Protected } from '../common/decorators/protected.js';
import { ReqCtx } from '../common/decorators/req-ctx.js';
import { vLogin, vRefreshToken, vSignup } from './auth.validator.js';
import { AuthService } from './services/auth.service.js';
import { UserLoginService } from './services/user-login.service.js';
import { ILoginDTO, IRefreshTokenDTO, IRequestCtx, ISignUpDTO } from './types/auth.type.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userLoginService: UserLoginService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@JoiBody(vSignup) payload: ISignUpDTO, @Ip() ip: string) {
    const authData = await this.authService.signup({ ...payload, ipAddress: ip });

    return successResponse('Signup success', authData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@JoiBody(vLogin) payload: ILoginDTO, @Ip() ip: string) {
    const authData = await this.authService.login({ ...payload, ipAddress: ip });

    return successResponse('Login success', authData);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@JoiBody(vRefreshToken) payload: IRefreshTokenDTO) {
    const authData = await this.authService.refreshToken(payload);

    return successResponse('Access token refreshed', authData);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Protected()
  async logout(@ReqCtx() ctx: IRequestCtx) {
    await this.userLoginService.logout(ctx.user._id, ctx.jwt.jti as string);

    return successResponse('User logged out');
  }
}
