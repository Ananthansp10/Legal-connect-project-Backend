import { IUserSignup } from "../../domain/entity/userEntity";
import { IBaseRepositorie } from "./IBaseRepositorie";


export interface IUserRepositorie extends IBaseRepositorie<IUserSignup>{
    updateUserStatus(userId:string,status:string):Promise<void>;
}