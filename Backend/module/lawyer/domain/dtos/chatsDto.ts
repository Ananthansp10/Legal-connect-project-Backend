import { Types } from "mongoose";

export interface IChatsDto {
  userId: Types.ObjectId;
  name: string;
  profileImage: string;
  lastMessage: string;
  unreadCount: number;
}
