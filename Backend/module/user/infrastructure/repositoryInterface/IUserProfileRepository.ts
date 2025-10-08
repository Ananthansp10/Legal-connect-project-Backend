import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IBaseRepository } from "./IbaseRepository";

export interface IUserProfileRepository
  extends IBaseRepository<IUserProfileEntitie> {}
