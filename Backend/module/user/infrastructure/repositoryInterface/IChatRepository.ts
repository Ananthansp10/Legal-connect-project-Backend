import { Types } from "mongoose";
import { IChatEntity, IMessages } from "../../domain/entity/chatEntity";
import { ILawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";

export interface IChatRepository {
  saveChat(data: IChatEntity): Promise<void>;
  findChatConnection(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<IChatEntity | null>;
  addMessage(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
    message: IMessages,
  ): Promise<void>;
  findUserChat(userId: Types.ObjectId): Promise<IChatEntity[] | null>;
  findLawyerDetails(
    lawyerId: Types.ObjectId,
  ): Promise<ILawyerProfileEntity | null>;
  updateChatReadStatus(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<void>;
}
