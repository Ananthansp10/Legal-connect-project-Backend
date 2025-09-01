import { Types } from "mongoose";


export interface ChatResponseDto{
    lawyerId:Types.ObjectId;
    name:string;
    profileImage:string;
    lastMessage:string;
}