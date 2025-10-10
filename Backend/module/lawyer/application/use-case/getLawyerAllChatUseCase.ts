import { Types } from "mongoose";
import { IChatsDto } from "../../domain/dtos/chatsDto";
import { ILawyerChatRepository } from "../../infrastructure/repositoryInterface/ILawyerChatRepository";
import { IGetLawyerAllChatsUseCase } from "../use-case-interface/IGetLawyerAllChatUseCase";

export class GetLawyerAllChatUseCase implements IGetLawyerAllChatsUseCase {
  constructor(private _chatRepo: ILawyerChatRepository) {}

  async execute(lawyerId: Types.ObjectId): Promise<IChatsDto[] | null> {
    const chats = await this._chatRepo.findAllChats(lawyerId);
    if (!chats || chats.length == 0) {
      return null;
    }
    const chatDetails = await Promise.all(
      chats.map(async (chat) => {
        const userDetails = await this._chatRepo.findUserDetails(
          chat.participants[0],
        );
        return {
          userId: userDetails?.userId ?? new Types.ObjectId(""),
          name: userDetails?.name ?? "",
          profileImage: userDetails?.profileImage ?? "",
          lastMessage: chat.messages[chat.messages.length - 1].message,
          lastMessageTime: chat.messages[chat.messages.length - 1].createdAt,
          unreadCount: chat.messages.filter(
            (msg) =>
              msg.receiverId.toString() == lawyerId.toString() && !msg.isRead,
          ).length,
        };
      }),
    );
    return chatDetails.reverse();
  }
}
