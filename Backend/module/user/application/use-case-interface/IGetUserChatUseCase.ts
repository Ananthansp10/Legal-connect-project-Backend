import { Types } from "mongoose";
import { IMessages } from "../../domain/entity/chatEntity";

export interface IGetUserChatUseCase {
  execute(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<IMessages[] | null>;
}
