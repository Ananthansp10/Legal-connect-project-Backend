import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";
import { IBaseRepository } from "./IbaseRepository";


export interface IGetLawyerRepository extends IBaseRepository<LawyerProfileEntity>{
    getLawyers():Promise<LawyerProfileEntity[]>;
    getLawyerById(lawyerId:string):Promise<LawyerProfileEntity | null>;
    getLawyerBySpecialization(specialization:string):Promise<LawyerProfileEntity[] | null>;
    getLawyerByName(name:string):Promise<LawyerProfileEntity[] | null>;
}