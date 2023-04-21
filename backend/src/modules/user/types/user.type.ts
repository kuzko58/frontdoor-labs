export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt: Date;
}

export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
