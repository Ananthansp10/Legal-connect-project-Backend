import { Types } from "mongoose";
import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepositorie } from "./IbaseRepository";



export interface IEditLawyerProfileRepositorie extends IBaseRepositorie<LawyerProfileEntity>{
    editLawyerProfile(lawyerId:Types.ObjectId,data:LawyerEditProfileResponse):Promise<void>;
}