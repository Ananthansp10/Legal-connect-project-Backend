import { IForgotPasswordRepository } from "../repositoryInterface/IForgotPasswordRepository";
import { userModel } from "../models/userSignupModel";

export class ForgotPasswordRepository implements IForgotPasswordRepository {
  async updatePasswordByEmail(email: string, password: string): Promise<void> {
    await userModel.updateOne(
      { email: email },
      { $set: { password: password } },
    );
  }
}
