import { Types } from "mongoose";
import { ChatResponseDto } from "../../domain/dtos/chatResponseDto";


export interface IGetAllChatUseCase{
    execute(userId:Types.ObjectId):Promise<ChatResponseDto[]>
}