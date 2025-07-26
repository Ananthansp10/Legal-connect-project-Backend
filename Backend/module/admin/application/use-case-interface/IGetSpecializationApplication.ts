import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IGetSpecializationApplication{
    execute():Promise<ISpecializationEntity[] | null>;
}