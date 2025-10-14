import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IGetProfileRepository
  extends IBaseRepository<IUserProfileEntitie> {
  getProfile(userId: string): Promise<IUserProfileEntitie | null>;
}
