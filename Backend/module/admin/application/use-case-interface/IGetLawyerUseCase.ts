import { ILawyerResponse } from "../../domain/dtos/lawyerDto";


export interface IGetLawyersUseCase{
    execute():Promise<ILawyerResponse[]>
}