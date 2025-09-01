import { Types } from "mongoose";
import { Messages } from "../../domain/entity/chatEntity";
import { IChatRepository } from "../../infrastructure/repositoryInterface/IChatRepository";
import { IAddChatUseCase } from "../use-case-interface/IAddChatUseCase";


export class AddChatUseCase implements IAddChatUseCase{

    constructor(
        private _chatRepo:IChatRepository
    ){}

    async execute(userId: Types.ObjectId, lawyerId: Types.ObjectId, message: Messages): Promise<void> {
        let findChatExist=await this._chatRepo.findChatConnection(userId,lawyerId)
        if(findChatExist){
            await this._chatRepo.addMessage(userId,lawyerId,message)
        }else{
            let chatObj={
                participants:[userId,lawyerId],
                messages:[message]
            }
            await this._chatRepo.saveChat(chatObj)
        }
    }
}