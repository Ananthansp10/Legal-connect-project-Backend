import { Types } from "mongoose";
import { Messages } from "../../domain/entity/chatEntity";

export interface IGetUserChatUseCase {
  execute(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
  ): Promise<Messages[] | null>;
}
