import { Types } from "mongoose";
import { IChatEntity, Messages } from "../../../user/domain/entity/chatEntity";
import { ILawyerChatRepository } from "../repositoryInterface/ILawyerChatRepository";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";
import { chatModel } from "../../../user/infrastructure/models/chatModel";
import { userProfileModel } from "../../../user/infrastructure/models/userProfileModel";

export class LawyerChatRepository implements ILawyerChatRepository {

    async findAllChats(lawyerId: Types.ObjectId): Promise<IChatEntity[] | null> {
        return await chatModel.find({ participants: { $in: [lawyerId] } })
    }

    async findChat(lawyerId: Types.ObjectId, userId: Types.ObjectId): Promise<Messages[] | null> {
        const chat = await chatModel.findOne({ participants: { $all: [lawyerId, userId] } })
        return chat?.messages ? chat.messages : null
    }

    async addChat(chat: IChatEntity): Promise<void> {
        await chatModel.create(chat)
    }

    async addMesssage(lawyerId: Types.ObjectId, userId: Types.ObjectId, message: Messages): Promise<void> {
        await chatModel.updateOne({ participants: { $all: [lawyerId, userId] } }, { $push: { messages: message } })
    }

    async findUserDetails(userId: Types.ObjectId): Promise<UserProfileEntitie | null> {
        return await userProfileModel.findOne({ userId: userId })
    }

    async updateReadStatus(lawyerId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
        await chatModel.updateMany({ participants: { $all: [lawyerId, userId] } },
            {
                $set: { 'messages.$[msg].isRead': true }
            },
            {
                arrayFilters: [{ 'msg.isRead': false, 'msg.receiverId': lawyerId }]
            }
        )
    }
}