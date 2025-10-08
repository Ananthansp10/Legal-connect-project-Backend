import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { IUserProfileRepository } from "../../infrastructure/repositoryInterface/IUserProfileRepository";
import { IAddProfileUseCase } from "../use-case-interface/IAddProfileUseCase";
import { IUserProfile, UserProfileMapper } from "../mapper/userProfileMapper";

export class AddProfileUseCase implements IAddProfileUseCase {
  constructor(private _userProfileRepo: IUserProfileRepository) {}

  async execute(data: IUserProfile, imageUrl: string): Promise<void> {
    try {
      const profileData: IUserProfileEntitie = UserProfileMapper.toRequest(
        data,
        imageUrl,
      );
      await this._userProfileRepo.create(profileData);
    } catch (error) {
      throw error;
    }
  }
}
