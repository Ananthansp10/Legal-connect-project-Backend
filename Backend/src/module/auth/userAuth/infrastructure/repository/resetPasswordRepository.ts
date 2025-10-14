import { IUserSignup } from "../../domain/userRegisterEntity";
import { IResetPasswordRepository } from "../repositoryInterface/IResetPasswordRepository";
import { userModel } from "../models/userSignupModel";
import { BaseRepository } from "./baseRepository";

export class ResetPasswordRepository
  extends BaseRepository<IUserSignup>
  implements IResetPasswordRepository
{
  constructor() {
    super(userModel);
  }
  async changePassword(email: string, password: string): Promise<void> {
    await userModel.updateOne(
      { email: email },
      { $set: { password: password } },
    );
  }
}
