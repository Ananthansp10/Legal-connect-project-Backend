import { getLawyerResponse } from "../mapper/getLawyerMapper";



export interface ISearchLawyerUseCase{
    execute(name:string):Promise<getLawyerResponse[] | null>;
}