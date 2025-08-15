import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepository } from "./IBaseRepository";


export interface ICheckAccoutStatusRepository extends IBaseRepository<IUserSignup>{

}