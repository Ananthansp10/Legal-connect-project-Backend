import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IGetSpecializationRepository {
    getSpecialization(): Promise<ISpecializationEntity[] | null>;
}