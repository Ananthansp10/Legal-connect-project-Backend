import { IUserSignup } from "../../domain/entity/userEntity";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository<IUserSignup>{
    updateUserStatus(userId:string,status:string):Promise<void>;
    searchUser(name:string):Promise<IUserSignup[] | null>;
    filterUser(status:string):Promise<IUserSignup[] | null>;
}