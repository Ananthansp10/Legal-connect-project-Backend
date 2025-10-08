import { AppStatus } from "../../../../common/status/appStatus";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { IVerifyUserStatusUseCase } from "../use-case-interface/IVerifyUserStatusUseCase";

export class VerifyUserStatusUseCase implements IVerifyUserStatusUseCase {
  constructor(private _userRepo: IUserRepository) {}

  async execute(userId: string, status: string): Promise<boolean> {
    try {
      await this._userRepo.updateUserStatus(userId, status);
      if (status == AppStatus.UNBLOCK) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}
