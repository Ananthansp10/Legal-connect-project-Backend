import { IUserSignup } from "../../domain/userRegisterEntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IResetPasswordRepository extends IBaseRepository<IUserSignup> {
  changePassword(email: string, password: string): Promise<void>;
}
