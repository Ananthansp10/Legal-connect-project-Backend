import { Types } from "mongoose";
import { IChatResponseDto } from "../../domain/dtos/chatResponseDto";
import { IChatRepository } from "../../infrastructure/repositoryInterface/IChatRepository";
import { IGetAllChatUseCase } from "../use-case-interface/IGetAllChatUseCase";

export class GetAllChatUseCase implements IGetAllChatUseCase {
  constructor(private _chatRepo: IChatRepository) {}

  async execute(userId: Types.ObjectId): Promise<IChatResponseDto[]> {
    const userChats = await this._chatRepo.findUserChat(userId);
    if (!userChats || userChats.length === 0) {
      return [];
    }
    const chatDetails = await Promise.all(
      userChats?.map(async (chat) => {
        let lawyerDetails = await this._chatRepo.findLawyerDetails(
          chat.participants[1],
        );
        return {
          lawyerId: chat.participants[1],
          name: lawyerDetails?.personalInfo.name ?? "",
          profileImage: lawyerDetails?.personalInfo.profileImage ?? "",
          lastMessage: chat.messages[chat.messages.length - 1].message,
          lastMessageTime: chat.messages[chat.messages.length - 1].createdAt,
          unreadCount: chat.messages.filter(
            (msg) =>
              msg.receiverId.toString() == userId.toString() && !msg.isRead,
          ).length,
          isOnline: true,
        };
      }),
    );
    return chatDetails.reverse();
  }
}
