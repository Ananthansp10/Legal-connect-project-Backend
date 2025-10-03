import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { ITokenGeneration } from "../../../userAuth/infrastructure/services/ItokenGenerationService";
import { AdminSignInDto } from "../../domain/dtos/adminSigninDto";
import { IAdminSigninUseCase } from "../use-case-interface/IadminSigninUseCase";

export class AdminSigninUseCase implements IAdminSigninUseCase {
  constructor(private _tokenGenerateService: ITokenGeneration) {}

  async execute(
    data: AdminSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      if (data.email != process.env.ADMIN_EMAIL) {
        throw new AppException(
          AppError.INVALID_EMAIL,
          AppStatusCode.UNAUTHORIZED,
        );
      }

      if (data.password != process.env.ADMIN_PASSWORD) {
        throw new AppException(
          AppError.INVALID_PASSWORD,
          AppStatusCode.UNAUTHORIZED,
        );
      }

      const accessToken = this._tokenGenerateService.generateAccessToken({
        id: "admin",
        role: "admin",
      });
      const refreshToken = this._tokenGenerateService.generateRefreshToken({
        id: "admin",
        role: "admin",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
