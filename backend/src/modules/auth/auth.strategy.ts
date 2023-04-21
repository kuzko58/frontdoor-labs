import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REQ_CTX } from '../../config/constants.js';
import { UserRepository } from '../user/repositories/user.repository.js';
import { IAppRequest, IRequestCtx } from './types/auth.type.js';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: IAppRequest, jwt: JwtPayload): Promise<IRequestCtx | null> {
    const user = await this.userRepo.db.findOne({ _id: jwt.sub });

    if (!user) return null;

    const ctx: IRequestCtx = { jwt, user };
    req[REQ_CTX] = ctx;

    return ctx;
  }
}
