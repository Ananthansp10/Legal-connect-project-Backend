import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepositorie } from "./IbaseRepositorie";


export interface IChangePasswordRepositorie extends IBaseRepositorie<ILawyerSignup>{
    changePassword(email:string,password:string):Promise<void>;
}