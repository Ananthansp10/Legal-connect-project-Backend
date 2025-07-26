import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IAddSpecializationApplication{
    execute(data:ISpecializationEntity):Promise<void>;
}