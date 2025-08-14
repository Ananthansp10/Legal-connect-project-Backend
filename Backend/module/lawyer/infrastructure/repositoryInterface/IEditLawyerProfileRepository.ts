import { Types } from "mongoose";
import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";



export interface IEditLawyerProfileRepository extends IBaseRepository<LawyerProfileEntity>{
    editLawyerProfile(lawyerId:Types.ObjectId,data:LawyerEditProfileResponse):Promise<void>;
}