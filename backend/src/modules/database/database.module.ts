import { Module, Provider } from '@nestjs/common';
import { connect } from 'mongoose';
import { DB_CONNECTION } from '../../config/constants.js';

const dbProvider: Provider = {
  provide: DB_CONNECTION,
  useFactory: async () => connect(process.env.DATABASE_URL as string),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
