import { Types } from "mongoose";
import { IChatRepository } from "../../infrastructure/repositoryInterface/IChatRepository";
import { IUpdateChatReadStatusUseCase } from "../use-case-interface/IUpdateChatReadStatusUseCase";


export class UpdateChatReadStatusUseCase implements IUpdateChatReadStatusUseCase {

    constructor(
        private _chatRepo: IChatRepository
    ) { }

    async execute(userId: Types.ObjectId, lawyerId: Types.ObjectId): Promise<void> {
        await this._chatRepo.updateChatReadStatus(userId, lawyerId)
    }
}