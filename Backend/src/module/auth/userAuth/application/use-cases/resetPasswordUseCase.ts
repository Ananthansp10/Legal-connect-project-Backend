import { IUserSignup } from "../../domain/userRegisterEntity";
import { IHashService } from "../../infrastructure/services/IhashService";
import { IResetPasswordRepository } from "../../infrastructure/repositoryInterface/IResetPasswordRepository";
import { AppError } from "../../../../../common/error/AppEnumError";
import { AppException } from "../../../../../common/error/errorException";
import { IResetPasswordUseCase } from "../use-case-Interface/IresetPasswordUseCase";
import bcrypt from "bcrypt";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private _resetPasswordRepo: IResetPasswordRepository,
    private _hashService: IHashService,
  ) {}

  async execute(
    email: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userExist: IUserSignup | null =
      await this._resetPasswordRepo.findByEmail(email);

    if (!userExist) {
      throw new AppException(AppError.USER_NOT_FOUND, AppStatusCode.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userExist.password!,
    );

    if (!isPasswordMatch) {
      throw new AppException(
        AppError.OLD_PASSWORD_WRONG,
        AppStatusCode.UNAUTHORIZED,
      );
    }

    const newHashhedPassword = await this._hashService.hash(newPassword);

    await this._resetPasswordRepo.changePassword(email, newHashhedPassword);
  }
}
