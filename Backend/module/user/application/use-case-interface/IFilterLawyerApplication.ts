import { getLawyerResponse } from "../mapper/getLawyerMapper";



export interface IFilterLawyerApplication{
    execute(specialization:string):Promise<getLawyerResponse[] | null>;
}