import { ILawyerResponse } from "../../domain/dtos/lawyerDto";



export interface IGetUnverifiedLawyersApplication{
    execute():Promise<ILawyerResponse[]>;
}