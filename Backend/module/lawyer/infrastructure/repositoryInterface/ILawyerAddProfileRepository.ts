import { ILawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface ILawyerAddProfile
  extends IBaseRepository<ILawyerProfileEntity> {}
