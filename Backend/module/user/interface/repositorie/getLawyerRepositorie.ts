import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IBaseRepositorie } from "./IbaseRepositorie";


export interface IGetLawyerRepositorie extends IBaseRepositorie<LawyerProfileEntity>{
    getLawyers():Promise<LawyerProfileEntity[]>;
    getLawyerById(lawyerId:string):Promise<LawyerProfileEntity | null>;
}