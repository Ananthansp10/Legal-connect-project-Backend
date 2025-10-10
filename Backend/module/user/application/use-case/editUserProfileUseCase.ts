import { IEditProfileRepository } from "../../infrastructure/repositoryInterface/IEditProfileRepository";
import { IUserProfile, UserProfileMapper } from "../mapper/userProfileMapper";
import { IEditProfileUseCase } from "../use-case-interface/IEditProfileUseCase";

export class EditUserProfileUseCase implements IEditProfileUseCase {
  constructor(private _editProfileRepo: IEditProfileRepository) {}

  async execute(
    userId: string,
    data: IUserProfile,
    imageUrl: string,
  ): Promise<UserProfileMapper> {
    const editedProfileData = UserProfileMapper.toRequest(data, imageUrl);

    return this._editProfileRepo.editUserProfile(userId, editedProfileData);
  }
}
