export interface IUserSigninDto {
  userData: {
    id: string;
    name: string;
    email: string;
    googleId?: string;
  };
  accessToken: string;
  refreshToken: string;
}
