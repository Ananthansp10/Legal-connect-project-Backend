import { Types } from "mongoose";
import { ILawyerChatRepository } from "../../infrastructure/repositoryInterface/ILawyerChatRepository";
import { IUpdateReadStatusUseCase } from "../use-case-interface/IUpdateReadStatusUseCase";


export class UpdateReadStatusUseCase implements IUpdateReadStatusUseCase {

    constructor(
        private _chatRepo: ILawyerChatRepository
    ) { }

    async execute(lawyerId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        await this._chatRepo.updateReadStatus(lawyerId, userId)
    }
}