import { Types } from "mongoose";
import { UserChatProfileDto } from "../../domain/dtos/userChatProfileDto";


export interface IGetUserChatProfileUseCase {
    execute(userId: Types.ObjectId): Promise<UserChatProfileDto | null>;
}