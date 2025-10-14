import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IGetLawyerRepository
  extends IBaseRepository<ILawyerProfileEntity> {
  getLawyers(): Promise<ILawyerProfileEntity[]>;
  getLawyerById(lawyerId: string): Promise<ILawyerProfileEntity | null>;
  getLawyerBySpecialization(
    specialization: string,
  ): Promise<ILawyerProfileEntity[] | null>;
  getLawyerByName(name: string): Promise<ILawyerProfileEntity[] | null>;
}
