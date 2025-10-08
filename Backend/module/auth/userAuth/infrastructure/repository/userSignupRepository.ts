import { IUserSignup } from "../../domain/userRegisterEntity";
import { IUserSignupRepository } from "../repositoryInterface/IUserSignupRepository";
import { BaseRepository } from "./baseRepository";
import { userModel } from "../models/userSignupModel";

export class UserSignupRepository
  extends BaseRepository<IUserSignup>
  implements IUserSignupRepository
{
  constructor() {
    super(userModel);
  }

  async updateUserToActive(email: string): Promise<void> {
    await userModel.updateOne({ email: email }, { $set: { isActive: true } });
  }
}
