import { Types } from "mongoose";
import { IChatsDto } from "../../domain/dtos/chatsDto";

export interface IGetLawyerAllChatsUseCase {
  execute(lawyerId: Types.ObjectId): Promise<IChatsDto[] | null>;
}
