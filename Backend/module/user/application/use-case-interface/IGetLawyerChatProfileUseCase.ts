import { Types } from "mongoose";
import { LawyerChatProfileDto } from "../../domain/dtos/lawyerChatProfileDto";


export interface IGetLawyerChatProfileUseCase{
    execute(lawyerId:Types.ObjectId):Promise<LawyerChatProfileDto | null>;
}