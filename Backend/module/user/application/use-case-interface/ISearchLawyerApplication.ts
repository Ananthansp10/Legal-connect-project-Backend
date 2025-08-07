import { getLawyerResponse } from "../mapper/getLawyerMapper";



export interface ISearchLawyerApplication{
    execute(name:string):Promise<getLawyerResponse[] | null>;
}