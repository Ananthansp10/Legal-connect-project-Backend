import { Types } from "mongoose";
import { IChatEntity, Messages } from "../../domain/entity/chatEntity";
import { LawyerProfileEntity } from "../../../lawyer/domain/entity/lawyerProfileEntity";


export interface IChatRepository{
    saveChat(data:IChatEntity):Promise<void>;
    findChatConnection(userId:Types.ObjectId,lawyerId:Types.ObjectId):Promise<IChatEntity | null>;
    addMessage(userId:Types.ObjectId,lawyerId:Types.ObjectId,message:Messages):Promise<void>;
    findUserChat(userId:Types.ObjectId):Promise<IChatEntity[] | null>;
    findLawyerDetails(lawyerId:Types.ObjectId):Promise<LawyerProfileEntity | null>;
    updateChatReadStatus(userId:Types.ObjectId,lawyerId:Types.ObjectId):Promise<void>;
}