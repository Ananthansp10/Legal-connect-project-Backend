import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IChangePasswordRepository } from "../repositoryInterface/IChangePasswordRepository";
import { lawyerModel } from "../models/lawyerModel";
import { BaseRepository } from "./baseRepository";

export class ChangePasswordRepository
  extends BaseRepository<ILawyerSignup>
  implements IChangePasswordRepository
{
  constructor() {
    super(lawyerModel);
  }

  async changePassword(email: string, password: string): Promise<void> {
    await lawyerModel.updateOne(
      { email: email },
      { $set: { password: password } },
    );
  }
}
