import { IUserProfile, UserProfileMapper } from "../mapper/userProfileMapper";

export interface IEditProfileUseCase {
  execute(
    userId: string,
    data: IUserProfile,
    imageUrl: string,
  ): Promise<UserProfileMapper>;
}
