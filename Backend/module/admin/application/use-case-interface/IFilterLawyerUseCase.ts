import { ILawyerResponse } from "../../domain/dtos/lawyerDto";


export interface IFilterLawyerUseCase{
    execute(status:string):Promise<ILawyerResponse[] | null>;
}