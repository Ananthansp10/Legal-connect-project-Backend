import { UserProfileMapper } from "../../application/mapper/userProfileMapper";
import { IUserProfileEntitie } from "../../domain/entity/userProfileUserEntity";
import { BaseRepository } from "../repository/baseRepository";

export interface IEditProfileRepository
  extends BaseRepository<IUserProfileEntitie> {
  editUserProfile(
    userId: string,
    data: IUserProfileEntitie,
  ): Promise<UserProfileMapper>;
}
