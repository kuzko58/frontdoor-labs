export interface IUserLogin {
  _id: string;
  userId: string;
  deviceName: string;
  ipAddress: string;
  tokenId: string;
  refreshToken: string;
  refreshedAt: Date;
  createdAt: Date;
}

export interface IUserLoginDTO {
  userId: string;
  deviceName: string;
  ipAddress: string;
}

export interface ILoginInfo {
  deviceName: string;
  ipAddress: string;
  userId: string;
  createdAt: Date;
}
