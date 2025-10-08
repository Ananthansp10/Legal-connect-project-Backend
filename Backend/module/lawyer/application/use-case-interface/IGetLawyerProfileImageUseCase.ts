import { Types } from "mongoose";

export interface IGetLawyerProfileImageUseCase {
  execute(lawyerId: Types.ObjectId): Promise<string | null>;
}
