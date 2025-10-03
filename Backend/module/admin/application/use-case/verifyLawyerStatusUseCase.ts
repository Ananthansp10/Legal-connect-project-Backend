import { AppStatus } from "../../../../common/status/appStatus";
import { ILawyerRepository } from "../../infrastructure/repositoryInterface/ILawyerRepository";
import { ILawyerVerificationStatusUseCase } from "../use-case-interface/IVerifyLawyerStatusUseCase";

export class VerifyLawyerStatusUseCase
  implements ILawyerVerificationStatusUseCase
{
  constructor(private _lawyerRepo: ILawyerRepository) {}

  async execute(lawyerId: string, status: string): Promise<boolean> {
    try {
      await this._lawyerRepo.updateLawyerStatus(lawyerId, status);
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
