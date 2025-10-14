import { Types } from "mongoose";
import { ILawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IGetLawyerProfileRepository
  extends IBaseRepository<ILawyerProfileEntity> {
  getLawyerProfile(lawyerId: string): Promise<ILawyerProfileEntity | null>;
  getLawyerProfileImage(lawyerId: Types.ObjectId): Promise<string | null>;
}
