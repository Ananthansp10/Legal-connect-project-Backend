import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepositorie } from "./baseRepositorie";


export interface IUserSignupRepositorie extends IBaseRepositorie<IUserSignup>{
    updateUserToActive(email:string):Promise<void>;
}