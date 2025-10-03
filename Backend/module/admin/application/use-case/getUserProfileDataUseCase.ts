import { Types } from "mongoose";
import { UserProfileDataDto } from "../../domain/dtos/userProfileDto";
import { IUserRepository } from "../../infrastructure/repositoryInterface/IuserRepository";
import { IGetUserProfileDataUseCase } from "../use-case-interface/IGetUserProfileDataUseCase";

export class GetUserProfileDataUseCase implements IGetUserProfileDataUseCase {
  constructor(private _userRepo: IUserRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<UserProfileDataDto | null> {
    const userProfileData = await this._userRepo.getUserDetails(lawyerId);
    if (!userProfileData) {
      return null;
    } else {
      let userProfileObj = {
        name: userProfileData.name,
        email: userProfileData.email,
        phoneNumber: userProfileData.phoneNumber,
        address: userProfileData.address,
        profileImage: userProfileData.profileImage,
        gender: userProfileData.gender,
        DOB: userProfileData.DOB,
        profession: userProfileData.proffession,
        company: userProfileData.company,
      };
      return userProfileObj;
    }
  }
}
