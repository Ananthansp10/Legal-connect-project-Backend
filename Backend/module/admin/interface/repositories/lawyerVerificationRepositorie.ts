import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepositorie } from "./IBaseRepositorie";


export interface ILawyerVerificationRepositorie extends IBaseRepositorie<ILawyerSignup>{
    updateLawyerVerification(lawyerId:string,status:boolean,reason:string):Promise<void>;
}