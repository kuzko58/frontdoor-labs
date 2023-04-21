import { Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { Repository } from '../../database/repository.js';
import { IUserLogin } from '../types/user-login.type.js';

const schema = new Schema<IUserLogin>({
  _id: { type: String, default: () => nanoid(20) },
  userId: String,
  deviceName: String,
  tokenId: String,
  refreshToken: String,
  ipAddress: String,
  refreshedAt: Date,
  createdAt: Date,
});

export class UserLoginRepository extends Repository<IUserLogin> {
  static doc = 'UserLogin';
  static schema = schema;
}
