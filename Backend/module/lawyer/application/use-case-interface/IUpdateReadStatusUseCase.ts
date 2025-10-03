import { Types } from "mongoose";

export interface IUpdateReadStatusUseCase {
  execute(lawyerId: Types.ObjectId, userId: Types.ObjectId): Promise<void>;
}
