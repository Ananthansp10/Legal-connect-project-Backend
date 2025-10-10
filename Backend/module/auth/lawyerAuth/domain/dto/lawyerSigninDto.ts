export interface ILawyerSigninResponseDto {
  lawyerDetails: {
    _id?: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}
