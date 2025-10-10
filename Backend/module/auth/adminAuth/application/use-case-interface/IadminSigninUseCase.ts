import { IAdminSignInDto } from "../../domain/dtos/adminSigninDto";

export interface IAdminSigninUseCase {
  execute(
    data: IAdminSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
