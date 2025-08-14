import { LawyerProfileEntity } from "../../domain/entity/lawyerProfileEntity";
import { IBaseRepositorie } from "./IbaseRepository";


export interface IGetLawyerProfileRepositorie extends IBaseRepositorie<LawyerProfileEntity>{
    getLawyerProfile(lawyerId:string):Promise<LawyerProfileEntity | null>;
}