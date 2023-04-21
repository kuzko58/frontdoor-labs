import { Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { Repository } from '../../database/repository.js';
import { IUser } from '../types/user.type.js';

const UserSchema = new Schema<IUser>({
  _id: { type: String, default: () => nanoid(16) },
  firstName: String,
  lastName: String,
  email: String,
  password: { type: String, select: false },
  createdAt: Date,
});

export class UserRepository extends Repository<IUser> {
  static doc = 'User';
  static schema = UserSchema;
}
