import { Model, Schema } from 'mongoose';

export abstract class Repository<T> {
  static doc: string;
  static schema: Schema;

  constructor(public db: Model<T>) {}
}
