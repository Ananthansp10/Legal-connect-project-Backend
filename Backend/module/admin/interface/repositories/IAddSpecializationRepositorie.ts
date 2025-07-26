import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IAddSpecializationRepositorie{
    addSpecialization(data:ISpecializationEntity):Promise<void>;
}