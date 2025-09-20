import { Types } from "mongoose";


export interface IUpdateChatReadStatusUseCase {
    execute(userId: Types.ObjectId, lawyerId: Types.ObjectId): Promise<void>;
}