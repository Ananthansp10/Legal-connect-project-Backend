import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepositorie } from "./baseRepositorie";


export interface IUserSigninRepositorie extends IBaseRepositorie<IUserSignup>{
    
}