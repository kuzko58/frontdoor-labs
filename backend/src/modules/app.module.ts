import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { CommonModule } from './common/common.module.js';
import { DatabaseModule } from './database/database.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [CommonModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
