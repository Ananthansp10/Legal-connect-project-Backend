import { getLawyerResponse } from "../mapper/getLawyerMapper";



export interface IGetLawyerApplication{
    execute():Promise<getLawyerResponse[] | null>;
}