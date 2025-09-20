import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IAddSpecializationRepository {
    addSpecialization(data: ISpecializationEntity): Promise<void>;
}