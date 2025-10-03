import { ISpecializationEntity } from "../../domain/entity/specializationEntity";

export interface IGetSpecializationRepository {
  getSpecialization(
    startIndex: number,
    limit: number,
  ): Promise<{
    specializations: ISpecializationEntity[];
    totalSpecializations: number;
  } | null>;
}
