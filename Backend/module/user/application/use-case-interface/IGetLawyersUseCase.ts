import { getLawyerResponse } from "../mapper/getLawyerMapper";



export interface IGetLawyerUseCase {
    execute(): Promise<getLawyerResponse[] | null>;
}