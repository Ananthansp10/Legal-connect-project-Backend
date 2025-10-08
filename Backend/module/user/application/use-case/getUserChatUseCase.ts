import { Types } from "mongoose";
import { Messages } from "../../domain/entity/chatEntity";
import { IChatRepository } from "../../infrastructure/repositoryInterface/IChatRepository";
import { IGetUserChatUseCase } from "../use-case-interface/IGetUserChatUseCase";

export class GetUserChatUseCase implements IGetUserChatUseCase {
  constructor(private _chatRepo: IChatRepository) {}

  async execute(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<Messages[] | null> {
    const userChat = await this._chatRepo.findChatConnection(userId, lawyerId);
    if (!userChat) {
      return null;
    } else {
      return userChat.messages;
    }
  }
}
