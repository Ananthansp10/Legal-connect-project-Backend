import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IGetProfileRepository } from "../../infrastructure/repositoryInterface/IGetProfileRepository";
import { UserProfileMapper } from "../mapper/userProfileMapper";
import { IGetProfileUseCase } from "../use-case-interface/IGetProfileUseCase";

export class GetUserProfileUseCase implements IGetProfileUseCase {
  constructor(private _getProfileRepo: IGetProfileRepository) {}

  async execute(userId: string): Promise<UserProfileMapper | null> {
    const userProfile: IUserProfileEntitie | null =
      await this._getProfileRepo.getProfile(userId);

    return userProfile ? userProfile : null;
  }
}
