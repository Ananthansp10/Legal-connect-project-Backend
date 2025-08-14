import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepository } from "./IBaseRepository";


export interface ILawyerRepository extends IBaseRepository<ILawyerSignup>{
    updateLawyerStatus(lawyerId:string,status:string):Promise<void>;
}