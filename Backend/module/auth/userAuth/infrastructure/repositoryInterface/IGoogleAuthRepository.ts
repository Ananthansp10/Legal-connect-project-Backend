import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepository } from "./IBaseRepository";


export interface IGoogleAuthRepository extends IBaseRepository<IUserSignup>{

}