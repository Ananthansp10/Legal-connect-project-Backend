import { Types } from "mongoose";
import { IUserChatProfileDto } from "../../domain/dtos/userChatProfileDto";

export interface IGetUserChatProfileUseCase {
  execute(userId: Types.ObjectId): Promise<IUserChatProfileDto | null>;
}
