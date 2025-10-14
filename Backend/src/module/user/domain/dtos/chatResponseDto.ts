import { Types } from "mongoose";

export interface IChatResponseDto {
  lawyerId: Types.ObjectId;
  name: string;
  profileImage: string;
  lastMessage: string;
}
