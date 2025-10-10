import { AppStatus } from "../../../../common/status/appStatus";
import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { ILawyerVerificationEmailService } from "../../infrastructure/services/ILawyerVerificationEmailService";
import { ILawyerVerificationRepository } from "../../infrastructure/repositoryInterface/lawyerVerificationRepository";
import { ILawyerVerificationUseCase } from "../use-case-interface/ILawyerVerificationUseCase";

export class LawyerVerificationUseCase implements ILawyerVerificationUseCase {
  constructor(
    private _lawyerVerificationRepo: ILawyerVerificationRepository,
    private _lawyerVerifyEmailService: ILawyerVerificationEmailService,
  ) {}

  async execute(
    lawyerId: string,
    status: string,
    reason: string,
  ): Promise<boolean> {
    const lawyer: ILawyerSignup | null =
      await this._lawyerVerificationRepo.findById(lawyerId);

    this._lawyerVerifyEmailService.sendVerificationEmail(
      lawyer?.email ?? "",
      lawyer?.name ?? "",
      status,
      reason,
    );

    if (status == AppStatus.APPROVE) {
      await this._lawyerVerificationRepo.updateLawyerVerification(
        lawyerId,
        true,
        reason,
      );
      return true;
    } else {
      await this._lawyerVerificationRepo.updateLawyerVerification(
        lawyerId,
        false,
        reason,
      );
      return false;
    }
  }
}
