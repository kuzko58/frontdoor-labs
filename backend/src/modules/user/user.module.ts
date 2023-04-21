import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { provideRepo } from '../database/utils/provide-repo.js';
import { UserRepository } from './repositories/user.repository.js';
import { UserService } from './services/user.service.js';

@Module({
  imports: [DatabaseModule],
  providers: [...provideRepo(UserRepository), UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
