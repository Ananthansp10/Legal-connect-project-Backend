import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepository } from "../repositoryInterface/IUserProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "./baseRepository";

export class UserProfileRepository
  extends BaseRepository<IUserProfileEntitie>
  implements IUserProfileRepository
{
  constructor() {
    super(userProfileModel);
  }
}
