import { Types } from "mongoose";
import { IMessages } from "../../domain/entity/chatEntity";

export interface IAddChatUseCase {
  execute(
    userId: Types.ObjectId,
    lawyerId: Types.ObjectId,
    message: IMessages,
  ): Promise<void>;
}
