import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepo } from '../database/utils/provide-repo.js';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { AuthStrategy } from './auth.strategy.js';
import { UserLoginRepository } from './repositories/user-login.repository.js';
import { AuthService } from './services/auth.service.js';
import { UserLoginService } from './services/user-login.service.js';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 60 * 5, issuer: 'frontdoor-api' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [...provideRepo(UserLoginRepository), AuthService, AuthStrategy, UserLoginService],
})
export class AuthModule {}
