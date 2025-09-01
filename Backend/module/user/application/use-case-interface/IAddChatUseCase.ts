import { Types } from "mongoose";
import { Messages } from "../../domain/entity/chatEntity";


export interface IAddChatUseCase{
    execute(userId:Types.ObjectId,lawyerId:Types.ObjectId,message:Messages):Promise<void>;
}