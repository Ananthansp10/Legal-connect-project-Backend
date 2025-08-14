import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IAddSpecializationUseCase{
    execute(data:ISpecializationEntity):Promise<void>;
}