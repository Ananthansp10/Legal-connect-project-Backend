import { ISpecializationEntity } from "../../domain/entity/specializationEntity";



export interface IGetSpecializationUseCase{
    execute():Promise<ISpecializationEntity[] | null>;
}