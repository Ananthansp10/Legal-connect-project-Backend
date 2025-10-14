export interface IUserSignup {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: number;
  googleId?: string;
  isActive: boolean;
  isBlock: boolean;
  createdAt?: Date;
}
