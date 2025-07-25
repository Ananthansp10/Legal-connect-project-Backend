import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface IGetLawyerDetailsApplication{
    execute(lawyerId:string):Promise<LawyerProfileEntity | null>;
}