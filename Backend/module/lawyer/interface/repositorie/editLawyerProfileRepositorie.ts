import { LawyerEditProfileResponse } from "../../application/mapper/lawyerEditProfileMapper";
import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepositorie } from "./IbaseRepositorie";



export interface IEditLawyerProfileRepositorie extends IBaseRepositorie<LawyerProfileEntity>{
    editLawyerProfile(lawyerId:string,data:LawyerEditProfileResponse):Promise<void>;
}