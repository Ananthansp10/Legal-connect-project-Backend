import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";


export interface IGetLawyerProfileApplication{
    execute(lawyerId:string):Promise<LawyerProfileEntity | null>;
}