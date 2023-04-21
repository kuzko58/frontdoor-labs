import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository.js';
import { ICreateUserDTO, IUser } from '../types/user.type.js';

@Injectable()
export class UserService {
  constructor(private rUser: UserRepository) {}

  async createUser(payload: ICreateUserDTO): Promise<IUser> {
    if (await this.rUser.db.exists({ email: payload.email })) {
      throw new ConflictException('User with email already exists');
    }

    const user = await this.rUser.db.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    console.log(user);

    return user;
  }

  // async getProfile(userId: string): Promise<IUserProfile> {
  //   const user = await this.rUser.findOneBy({ id: userId });

  //   if (!user) throw new NotFoundException('User not found');

  //   return { user };
  // }
}
