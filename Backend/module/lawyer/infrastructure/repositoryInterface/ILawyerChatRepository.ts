import { Types } from "mongoose";
import { IChatEntity, Messages } from "../../../user/domain/entity/chatEntity";
import { UserProfileEntitie } from "../../../user/domain/entity/userProfileUserEntity";


export interface ILawyerChatRepository{
    findAllChats(lawyerId:Types.ObjectId):Promise<IChatEntity[] | null>;
    findChat(lawyerId:Types.ObjectId,userId:Types.ObjectId):Promise<Messages[] | null>;
    addChat(chat:IChatEntity):Promise<void>;
    addMesssage(lawyerId:Types.ObjectId,userId:Types.ObjectId,message:Messages):Promise<void>;
    findUserDetails(userId:Types.ObjectId):Promise<UserProfileEntitie | null>;
    updateReadStatus(lawyerId:Types.ObjectId,userId:Types.ObjectId):Promise<void>;
}