import { UserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IGetProfileRepository
  extends IBaseRepository<UserProfileEntitie> {
  getProfile(userId: string): Promise<UserProfileEntitie | null>;
}
