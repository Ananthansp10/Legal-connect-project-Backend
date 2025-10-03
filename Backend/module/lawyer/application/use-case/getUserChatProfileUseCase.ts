import { Types } from "mongoose";
import { UserChatProfileDto } from "../../domain/dtos/userChatProfileDto";
import { ILawyerChatRepository } from "../../infrastructure/repositoryInterface/ILawyerChatRepository";
import { IGetUserChatProfileUseCase } from "../use-case-interface/IGetUserChatProfileUseCase";

export class GetUserChatProfileUseCase implements IGetUserChatProfileUseCase {
  constructor(private _chatRepo: ILawyerChatRepository) {}

  async execute(userId: Types.ObjectId): Promise<UserChatProfileDto | null> {
    const userProfile = await this._chatRepo.findUserDetails(userId);
    return {
      name: userProfile?.name!,
      profileImage: userProfile?.profileImage!,
      country: userProfile?.address.country!,
      state: userProfile?.address.state!,
    };
  }
}
