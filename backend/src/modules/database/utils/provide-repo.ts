import { Provider } from '@nestjs/common';
import { Connection, Schema } from 'mongoose';
import { DB_CONNECTION } from '../../../config/constants.js';
import { Repository } from '../repository.js';

interface Type2<T = any> extends Function {
  new (...args: any[]): T;
  doc: string;
  schema: Schema;
}

export const provideRepo = (...repos: Type2<Repository<any>>[]): Provider[] => {
  return repos.map((repo) => ({
    provide: repo,
    inject: [DB_CONNECTION],
    useFactory: (connection: Connection) => new repo(connection.model(repo.doc, repo.schema)),
  }));
};
