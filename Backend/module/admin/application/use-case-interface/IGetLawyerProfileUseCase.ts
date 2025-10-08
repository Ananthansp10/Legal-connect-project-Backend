import { Types } from "mongoose";
import { LawyerProfileDataDto } from "../../domain/dtos/lawyerProfileDataDto";

export interface IGetLawyerProfileDataUseCase {
  execute(lawyerId: Types.ObjectId): Promise<LawyerProfileDataDto | null>;
}
