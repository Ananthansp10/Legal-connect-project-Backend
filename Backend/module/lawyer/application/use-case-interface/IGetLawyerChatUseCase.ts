import { Types } from "mongoose";
import { Messages } from "../../../user/domain/entity/chatEntity";


export interface IGetLawyerChatUseCase{
    execute(lawyerId:Types.ObjectId,userId:Types.ObjectId):Promise<Messages[] | null>;
}