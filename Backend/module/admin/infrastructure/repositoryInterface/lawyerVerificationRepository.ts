import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepository } from "./IBaseRepository";

export interface ILawyerVerificationRepository
  extends IBaseRepository<ILawyerSignup> {
  updateLawyerVerification(
    lawyerId: string,
    status: boolean,
    reason: string,
  ): Promise<void>;
}
