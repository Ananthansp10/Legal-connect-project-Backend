import { Types } from "mongoose";
import { ILawyerProfileDataDto } from "../../domain/dtos/lawyerProfileDataDto";

export interface IGetLawyerProfileDataUseCase {
  execute(lawyerId: Types.ObjectId): Promise<ILawyerProfileDataDto | null>;
}
