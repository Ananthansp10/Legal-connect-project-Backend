import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepositorie } from "./IBaseRepositorie";


export interface ILawyerRepositorie extends IBaseRepositorie<ILawyerSignup>{
    updateLawyerStatus(lawyerId:string,status:string):Promise<void>;
}