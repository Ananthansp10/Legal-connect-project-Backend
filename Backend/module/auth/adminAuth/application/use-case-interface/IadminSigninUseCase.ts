import { AdminSignInDto } from "../../domain/dtos/adminSigninDto";

export interface IAdminSigninUseCase {
  execute(
    data: AdminSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
