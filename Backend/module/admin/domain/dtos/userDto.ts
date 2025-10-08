export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: number;
  status: boolean;
  createdAt?: Date;
}
