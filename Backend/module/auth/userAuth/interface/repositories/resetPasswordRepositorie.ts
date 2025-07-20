import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepositorie } from "./baseRepositorie";


export interface IResetPassword extends IBaseRepositorie<IUserSignup>{
    changePassword(email:string,password:string):Promise<void>;
}