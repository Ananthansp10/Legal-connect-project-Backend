import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IGetSpecializationRepositorie{
    getSpecialization():Promise<ISpecializationEntity[] | null>;
}