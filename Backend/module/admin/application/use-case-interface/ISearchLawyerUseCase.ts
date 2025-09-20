import { ILawyerResponse } from "../../domain/dtos/lawyerDto";


export interface ISearchLawyerUseCase {
    execute(name: string): Promise<ILawyerResponse[] | null>;
}