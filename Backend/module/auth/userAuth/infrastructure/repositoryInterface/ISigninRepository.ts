import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserSigninRepository extends IBaseRepository<IUserSignup> {

}