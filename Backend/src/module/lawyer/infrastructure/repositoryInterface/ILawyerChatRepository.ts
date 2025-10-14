import { Types } from "mongoose";
import { IChatEntity, IMessages } from "../../../user/domain/entity/chatEntity";
import { IUserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";

export interface ILawyerChatRepository {
  findAllChats(lawyerId: Types.ObjectId): Promise<IChatEntity[] | null>;
  findChat(
    lawyerId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<IMessages[] | null>;
  addChat(chat: IChatEntity): Promise<void>;
  addMesssage(
    lawyerId: Types.ObjectId,
    userId: Types.ObjectId,
    message: IMessages,
  ): Promise<void>;
  findUserDetails(userId: Types.ObjectId): Promise<IUserProfileEntitie | null>;
  updateReadStatus(
    lawyerId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<void>;
}
