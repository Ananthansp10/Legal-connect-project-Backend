export interface IUserSignupRequestDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  isActive: boolean;
  isBlock: boolean;
}

export interface IUserSignupResponseDto {
  _id: string;
  name: string;
  email: string;
}
