import { lawyerModel } from "../../../auth/lawyerAuth/infrastructure/models/lawyerModel";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerVerificationRepository } from "../repositoryInterface/lawyerVerificationRepository";
import { BaseRepository } from "./baseRepository";

export class LawyerVerificationRepository
  extends BaseRepository<ILawyerSignup>
  implements ILawyerVerificationRepository
{
  constructor() {
    super(lawyerModel);
  }

  async updateLawyerVerification(
    lawyerId: string,
    status: boolean,
    reason: string,
  ): Promise<void> {
    if (reason == "null") {
      await lawyerModel.findByIdAndUpdate(lawyerId, {
        $set: { verified: status },
      });
    } else {
      await lawyerModel.findByIdAndUpdate(lawyerId, {
        $set: { verified: status, reason: reason },
      });
    }
  }
}
