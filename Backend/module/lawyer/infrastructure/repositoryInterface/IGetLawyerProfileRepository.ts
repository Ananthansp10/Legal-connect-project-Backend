import { Types } from "mongoose";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";


export interface IGetLawyerProfileRepository extends IBaseRepository<LawyerProfileEntity>{
    getLawyerProfile(lawyerId:string):Promise<LawyerProfileEntity | null>;
    getLawyerProfileImage(lawyerId:Types.ObjectId):Promise<string | null>;
}