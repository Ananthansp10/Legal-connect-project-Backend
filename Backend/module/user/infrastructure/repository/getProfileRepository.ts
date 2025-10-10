import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepository } from "../repositoryInterface/IGetProfileRepository";
import { userProfileModel } from "../models/userProfileModel";
import { BaseRepository } from "./baseRepository";

export class GetProfileRepository
  extends BaseRepository<IUserProfileEntitie>
  implements IGetProfileRepository
{
  constructor() {
    super(userProfileModel);
  }

  async getProfile(userId: string): Promise<IUserProfileEntitie | null> {
    return await userProfileModel.findOne({ userId: userId });
  }
}
