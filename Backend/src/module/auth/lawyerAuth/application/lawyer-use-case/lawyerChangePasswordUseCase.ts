import { AppException } from "../../../../../common/error/errorException";
import { AppStatusCode } from "../../../../../common/statusCode/AppStatusCode";
import { IHashService } from "../../../userAuth/infrastructure/services/IhashService";
import { IChangePasswordRepository } from "../../infrastructure/repositoryInterface/IChangePasswordRepository";
import { ILawyerChangePasswordUseCase } from "../lawyer-use-case-interface/IlawyerChangePasswordUseCase";
import jwt from "jsonwebtoken";

export class LawyerChangePasswordUseCase
  implements ILawyerChangePasswordUseCase
{
  constructor(
    private _changePasswordRepo: IChangePasswordRepository,
    private _hashService: IHashService,
  ) {}

  async changePassword(
    email: string,
    password: string,
    token: string,
  ): Promise<void> {
    try {
      const decodeToken = jwt.decode(token) as jwt.JwtPayload;

      if (Date.now() > (decodeToken.exp ?? 0) * 1000) {
        throw new AppException(
          "Link has Expired try again",
          AppStatusCode.EXPIRED,
        );
      }

      jwt.verify(token, process.env.FORGOT_PASSWORD_TOKEN_SECRET!);

      const hashedPassword: string = await this._hashService.hash(password);

      await this._changePasswordRepo.changePassword(email, hashedPassword);
    } catch (error) {
      throw error;
    }
  }
}
