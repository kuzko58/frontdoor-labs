import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { UserLoginRepository } from '../repositories/user-login.repository.js';
import { ILoginInfo, IUserLoginDTO } from '../types/user-login.type.js';

@Injectable()
export class UserLoginService {
  constructor(private rUserLogin: UserLoginRepository, private jwtService: JwtService) {}

  async login(
    userId: string,
    payload: IUserLoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userLogin = await this.rUserLogin.db.create({
      userId,
      ipAddress: payload.ipAddress,
      deviceName: payload.deviceName,
      createdAt: new Date(),
      refreshedAt: new Date(),
      tokenId: nanoid(20),
      refreshToken: nanoid(50),
    });
    const token = this.jwtService.sign({}, { subject: userId, jwtid: userLogin.tokenId });

    return { accessToken: token, refreshToken: userLogin.refreshToken };
  }

  async refresh(
    userId: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userLogin = await this.rUserLogin.db.findOne({ userId, refreshToken });

    if (!userLogin) throw new UnauthorizedException('Token not valid');

    userLogin.tokenId = nanoid(20);
    userLogin.refreshToken = nanoid(50);
    userLogin.refreshedAt = new Date();

    await userLogin.save();

    const accessToken = this.jwtService.sign({}, { subject: userId, jwtid: userLogin.tokenId });

    return { accessToken, refreshToken: userLogin.refreshToken };
  }

  async getLogins(userId: string): Promise<ILoginInfo[]> {
    const logins = await this.rUserLogin.db
      .find({ userId })
      .select(['userId', 'deviceName', 'ipAddress', 'createdAt']);

    return logins;
  }

  async logout(userId: string, tokenId: string): Promise<void> {
    await this.rUserLogin.db.deleteOne({ userId, tokenId });
  }

  async logOutAll(userId: string): Promise<void> {
    await this.rUserLogin.db.deleteMany({ userId });
  }
}
