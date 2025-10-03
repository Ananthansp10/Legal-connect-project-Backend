import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserSignupRepository extends IBaseRepository<IUserSignup> {
  updateUserToActive(email: string): Promise<void>;
}
