import { ILawyerResponse } from "../../domain/dtos/lawyerDto";



export interface IGetUnverifiedLawyersUseCase {
    execute(): Promise<ILawyerResponse[]>;
}