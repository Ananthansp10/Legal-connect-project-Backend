import { Types } from "mongoose";
import { IChatResponseDto } from "../../domain/dtos/chatResponseDto";

export interface IGetAllChatUseCase {
  execute(userId: Types.ObjectId): Promise<IChatResponseDto[]>;
}
