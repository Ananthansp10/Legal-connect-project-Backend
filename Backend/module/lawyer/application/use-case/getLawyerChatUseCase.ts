import { Types } from "mongoose";
import { Messages } from "../../../user/domain/entity/chatEntity";
import { ILawyerChatRepository } from "../../infrastructure/repositoryInterface/ILawyerChatRepository";
import { IGetLawyerChatUseCase } from "../use-case-interface/IGetLawyerChatUseCase";

export class GetLawyerChatUseCase implements IGetLawyerChatUseCase {
  constructor(private _chatRepo: ILawyerChatRepository) {}

  async execute(
    lawyerId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<Messages[] | null> {
    const chat = await this._chatRepo.findChat(lawyerId, userId);
    return chat;
  }
}
