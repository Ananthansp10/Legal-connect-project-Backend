import { ILawyerResponse } from "../../domain/dtos/lawyerDto";


export interface IGetLawyersApplication{
    execute():Promise<ILawyerResponse[]>
}