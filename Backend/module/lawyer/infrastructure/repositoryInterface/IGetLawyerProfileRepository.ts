import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";


export interface IGetLawyerProfileRepository extends IBaseRepository<LawyerProfileEntity>{
    getLawyerProfile(lawyerId:string):Promise<LawyerProfileEntity | null>;
}