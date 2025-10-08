export interface UserSignupRequestDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  isActive: boolean;
  isBlock: boolean;
}

export interface UserSignupResponseDto {
  _id: string;
  name: string;
  email: string;
}
