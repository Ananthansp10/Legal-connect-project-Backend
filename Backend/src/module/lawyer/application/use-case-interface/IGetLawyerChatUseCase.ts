import { Types } from "mongoose";
import { IMessages } from "../../../user/domain/entity/chatEntity";

export interface IGetLawyerChatUseCase {
  execute(
    lawyerId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<IMessages[] | null>;
}
