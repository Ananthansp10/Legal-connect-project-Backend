import { Types } from "mongoose";


export interface ChatsDto {
    userId: Types.ObjectId;
    name: string;
    profileImage: string;
    lastMessage: string;
    unreadCount: number;
}