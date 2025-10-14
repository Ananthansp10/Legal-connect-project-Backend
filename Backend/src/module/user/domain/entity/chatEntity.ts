import { Types } from "mongoose";

export interface IMessages {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface IChatEntity {
  participants: Types.ObjectId[];
  messages: IMessages[];
}
