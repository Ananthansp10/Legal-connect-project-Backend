import { Types } from "mongoose";
import { ILawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { ILawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IEditLawyerProfileRepository
  extends IBaseRepository<ILawyerProfileEntity> {
  editLawyerProfile(
    lawyerId: Types.ObjectId,
    data: ILawyerEditProfileResponse,
  ): Promise<void>;
}
