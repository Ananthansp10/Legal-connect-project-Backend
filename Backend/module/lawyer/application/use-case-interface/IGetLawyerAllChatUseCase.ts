import { Types } from "mongoose";
import { ChatsDto } from "../../domain/dtos/chatsDto";

export interface IGetLawyerAllChatsUseCase {
  execute(lawyerId: Types.ObjectId): Promise<ChatsDto[] | null>;
}
