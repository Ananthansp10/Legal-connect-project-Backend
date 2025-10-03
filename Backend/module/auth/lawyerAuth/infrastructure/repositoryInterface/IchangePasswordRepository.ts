import { ILawyerSignup } from "../../domain/entity/lawyerEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IChangePasswordRepository
  extends IBaseRepository<ILawyerSignup> {
  changePassword(email: string, password: string): Promise<void>;
}
